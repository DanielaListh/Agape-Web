//script para la ejecucion del modal de manera dinamica

document.addEventListener("click", async (event) => {
    let target = event.target;// el evento seleccionado
  
    //si el click fue en la img de trash, que tome el objetivo del btn padre
    if(target.tagName === "IMG" && target.closest(".btn-trash")){
      target = target.closest(".btn-trash").querySelector("button");
   }

    // Verifica si se hizo clic en el .btn-trash
    if(target && 
        (target.matches(".btn-trash button") || target.matches(".btn-trash img"))
    ){
      const idEstado = target.dataset.idEstado; // Obtiene el ID del registro desde el atributo data

      console.log("ID Provincia: ", idEstado);
      
      if(!idEstado){//si no se obtuvo la idEspecialidad lanza un error en el nav console
        console.error("no se encontro el id de la provincia de este registro");
        return;
      }

      try {
        // Petición para obtener los datos del genero
        const response = await fetch(`http://localhost:3000/estados/${idEstado}`);//idEstado
        if (!response.ok) throw new Error("Error al obtener los datos");//linea optimizada
        const data = await response.json();// datos recibe toda la info del fetch
        console.log("datos obtenidos de back:", data);
        // a veces es data a veces es data[0] :V
        const provincia = data[0];//se accede al objeto data
        // Llamamos a la función para actualizar el modal
        actualizarModal(provincia);
      } catch (error) {
        console.error("Hubo un problema:", error);
      }
    }
  });
  
  // Función para actualizar el contenido del modal
  function actualizarModal(provincia) {
    if (!provincia) {
      console.error("No se encontraron datos válidos para la provincia.");
      return;
    }
    //ocurria un error porque parece ser que el fetch devuelve un array con un 
    // objeto dentro en lugar de un objeto directamente. Lo vemos porque console.log(data) 
    // imprime [{...}] (un array con un solo objeto). ver en linea 26:27
    //para evitar el error se coloca:
    //const data = await response.json();// datos recibe toda la info del fetch
    //const provincia = data;//se accede al objeto data
    //// Llamamos a la función para actualizar el modal
    //actualizarModal(provincia);

    // Referencias a los elementos del modal
    const modal = document.querySelector(".modal");
    if (!modal){
      console.error("no se encontro el modal en el DOM");
      return;
    }

    const idField = modal.querySelector("#idProvincia span");
    const nombreField = modal.querySelector("#nombreProvincia span");
    const avisoField = modal.querySelector(".texto-aviso span");
    const btnEliminar = modal.querySelector(".btn-eliminar");

    if(!idField || !nombreField || !btnEliminar){
      console.error("uno o mas elementos del modal no fueron encontrados");
      return;
    }

    console.log(provincia);//depuracion
  
    // Asignamos los valores dinámicos
    idField.textContent = provincia.id_estado || "No disponible";
    nombreField.textContent = provincia.nombre_estado  || "No disponible";

    //
    avisoField.textContent = provincia.id_estado || "undefinded";

    // configuramos el boton de eliminacion con el id
    btnEliminar.dataset.idEstado = provincia.id_estado;

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
  
  // Evento para eliminar el registro
  document.querySelector(".btn-eliminar").addEventListener("click", async (event) => {
    const idEstado = event.target.dataset.idEstado;
  
    try {
      const response = await fetch(`http://localhost:3000/estados/${idEstado}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar el registro");
      alert("Registro eliminado con éxito");
      document.querySelector(".modal").classList.remove("modal--show"); //elimina el modal, antes lo ocultaba
      //actuallizar o renderizar autoaticamente la tabla
      ObtenerProvincias();
    } catch (error) {
      console.error("Hubo un problema al eliminar:", error);
      alert("Hubo un problema al eliminar:", error)
    }
  });