//script para la ejecucion del modal de manera dinamica

document.addEventListener("click", async (event) => {
    let target = event.target;
  
    //si el click fue en la img de trash, que tome el objetivo del btn padre
    if(target.tagName === "IMG" && target.closest(".btn-trash")){
      target = target.closest(".btn-trash").querySelector("button");
   }

    // Verifica si se hizo clic en el .btn-trash
    if(target && target.matches(".btn-trash button") || target.matches(".btn-trash img")){
      const idEspecialidad = target.dataset.idEspecialidad; // Obtiene el ID de la especialidad desde el atributo data

      console.log("ID especialidad: ", idEspecialidad);
      
      if(!idEspecialidad){//si no se obtuvo la idEspecialidad lanza un error en el nav console
        console.error("no se encontro el id de la especialidad de este registro");
        return;
      }

      try {
        // Petición para obtener los datos de la especialidad
        const response = await fetch(`http://localhost:3000/especialidades/${idEspecialidad}`);
        if (!response.ok) throw new Error("Error al obtener los datos");//linea optimizada
        const data = await response.json();// datos recibe toda la info del fetch
        const especialidad = data[0];//se accede al primer objeto del array
        // Llamamos a la función para actualizar el modal
        actualizarModal(especialidad);
      } catch (error) {
        console.error("Hubo un problema:", error);
      }
    }
  });
  
  // Función para actualizar el contenido del modal
  function actualizarModal(especialidad) {

    if (!especialidad) {
      console.error("No se encontraron datos válidos para la especialidad.");
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

    const idField = modal.querySelector("#idEspecialidad span");
    const nombreField = modal.querySelector("#nombreEspecialidad span");
    const descripcionField = modal.querySelector("#descripcionEspecialidad span");
    const fechaField = modal.querySelector("#fechaAltaEspecialidad span");
    const imgField = modal.querySelector(".previa-img img");
    const avisoField = modal.querySelector(".texto-aviso span");
    const btnEliminar = modal.querySelector(".btn-eliminar");

    if(!idField || !nombreField || !descripcionField || !fechaField || !imgField || !btnEliminar){
      console.error("uno o mas elementos del modal no fueron encontrados");
      return;
    }

    console.log(especialidad);//depuracion

    const baseUrl = "http://localhost:3000/"; 
    const imgPath = especialidad.imagen_especialidad_med.replace(/^\.?\//, ""); // Elimina "./" si existe
    const imgURL = baseUrl + imgPath;

  
    // Asignamos los valores dinámicos
    idField.textContent = especialidad.id_especialidad_medica || "No disponible";
    nombreField.textContent = especialidad.nombre_especialidad_med  || "No disponible";
    descripcionField.textContent = especialidad.descripcion_especialidad_med  || "No disponible";
    fechaField.textContent = especialidad.fecha_alta_especialidad_med  || "No disponible";
    imgField.src = imgURL; // si no hay imagen, dejamos vacio
    imgField.alt = especialidad.nombre_especialidad_med || "Imagen no disponible";

    //
    avisoField.textContent = especialidad.id_especialidad_medica || "undefinded";

    // configuramos el boton de eliminacion con el id
    btnEliminar.dataset.id = especialidad.id_especialidad_medica;

    console.log("Datos cargados en el modal:", {
      ID: idField.textContent,
      Nombre: nombreField.textContent,
      Descripción: descripcionField.textContent,
      Fecha: fechaField.textContent,
      Imagen: imgField.src,
    });
  
    // Mostramos el modal
    modal.classList.add("modal--show");// muestra el modal
    
  }
  
  // Evento para cerrar el modal al hacer clic en "Cancelar"
  document.querySelector(".btn-cancelar").addEventListener("click", () => {
   const modal = document.querySelector(".modal");
    modal.classList.remove("modal--show");//ocultamos el modal
  });
  
  // Evento para eliminar la especialidad
  document.querySelector(".btn-eliminar").addEventListener("click", async (event) => {
    const idEspecialidad = event.target.dataset.id;
  
    try {
      const response = await fetch(`http://localhost:3000/especialidades/${idEspecialidad}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar el registro");
      alert("Registro eliminado con éxito");
      document.querySelector(".modal").classList.remove("modal--show"); //elimina el modal, antes lo ocultaba
      //actuallizar o renderizar autoaticamente la tabla
      ObtenerEspecialidadesMedicas();
    } catch (error) {
      console.error("Hubo un problema al eliminar:", error);
      alert("Hubo un problema al eliminar:", error)
    }
  });
  