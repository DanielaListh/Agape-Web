//script para la ejecucion del modal de manera dinamica

document.addEventListener("click", async (event) => {
    let target = event.target;
  
    //si el click fue en la img de trash, que tome el objetivo del btn padre
    if(target.tagName === "IMG" && target.closest(".btn-trash")){
      target = target.closest(".btn-trash").querySelector("button");
   }

    // Verifica si se hizo clic en el .btn-trash
    if(target && target.matches(".btn-trash button") || target.matches(".btn-trash img")){
      const idGenero = target.dataset.idGenero; // Obtiene el ID de la especialidad desde el atributo data

      console.log("ID Genero: ", idGenero);
      
      if(!idGenero){//si no se obtuvo la idEspecialidad lanza un error en el nav console
        console.error("no se encontro el id del genero de este registro");
        return;
      }

      try {
        // Petición para obtener los datos del genero
        const response = await fetch(`http://localhost:3000/generos/${idGenero}`);
        if (!response.ok) throw new Error("Error al obtener los datos");//linea optimizada
        const data = await response.json();// datos recibe toda la info del fetch
        const genero = data[0];//se accede al primer objeto del array
        // Llamamos a la función para actualizar el modal
        actualizarModal(genero);
      } catch (error) {
        console.error("Hubo un problema:", error);
      }
    }
  });
  
  // Función para actualizar el contenido del modal
  function actualizarModal(genero) {

    if (!genero) {
      console.error("No se encontraron datos válidos para el genero.");
      return;
    }
    //ocurria un error porque parece ser que el fetch devuelve un array con un 
    // objeto dentro en lugar de un objeto directamente. Lo vemos porque console.log(data) 
    // imprime [{...}] (un array con un solo objeto). ver en linea 26:27

    // Referencias a los elementos del modal
    const modal = document.querySelector(".modal");
    if (!modal){
      console.error("no se encontro el modal en el DOM");
      return;
    }

    const idField = modal.querySelector("#idGenero span");
    const nombreField = modal.querySelector("#nombreGenero span");
    const avisoField = modal.querySelector(".texto-aviso span");
    const btnEliminar = modal.querySelector(".btn-eliminar");

    if(!idField || !nombreField || !btnEliminar){
      console.error("uno o mas elementos del modal no fueron encontrados");
      return;
    }

    console.log(genero);//depuracion
  
    // Asignamos los valores dinámicos
    idField.textContent = genero.id_genero || "No disponible";
    nombreField.textContent = genero.nombre_genero  || "No disponible";

    //
    avisoField.textContent = genero.id_genero || "undefinded";

    // configuramos el boton de eliminacion con el id
    btnEliminar.dataset.id = genero.id_genero;

    console.log("Datos cargados en el modal:", {
      ID: idField.textContent,
      Nombre: nombreField.textContent
    });
  
    // Mostramos el modal
    modal.classList.add("modal--show");// muestra el modal
    
  }
  
  // Evento para cerrar el modal al hacer clic en "Cancelar"
  document.querySelector(".btn-cancelar").addEventListener("click", () => {
   const modal = document.querySelector(".modal");
    modal.classList.remove("modal--show");//ocultamos el modal
  });
  
  // Evento para eliminar el evento
  document.querySelector(".btn-eliminar").addEventListener("click", async (event) => {
    const idGenero = event.target.dataset.id;
  
    try {
      const response = await fetch(`http://localhost:3000/generos/${idGenero}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar el registro");
      alert("Registro eliminado con éxito");
      document.querySelector(".modal").classList.remove("modal--show"); //elimina el modal, antes lo ocultaba
      //actuallizar o renderizar autoaticamente la tabla
      ObtenerGeneros();
    } catch (error) {
      console.error("Hubo un problema al eliminar:", error);
      alert("Hubo un problema al eliminar:", error)
    }
  });