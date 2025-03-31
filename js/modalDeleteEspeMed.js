//script para la ejecucion del modal de manera dinamica

document.addEventListener("click", async (event) => {
    let target = event.target;
  
    //si el click fue en la img de trash, que tome el objetivo del btn padre
    if(target.tagName === "img" && target.closest(".btn-trash")){
      target = target.closest(".btn-trash");
   }

    // Verifica si se hizo clic en el .btn-trash
    if(target.matches(".btn-trash button")){
      const idEspecialidad = target.dataset.idEspecialidad; // Obtiene el ID de la especialidad desde el atributo data

      console.log("ID especialidad: ", idEspecialidad);
      console.log(`Id especialidada buscar: ${idEspecialidad}`);
      
      
      if(!idEspecialidad){//si no se obtuvo la idEspecialidad lanza un error en el nav console
        console.error("no se encontro el id de la especialidad");
        return;
      }


      try {
        // Petición para obtener los datos de la especialidad
        const response = await fetch(`http://localhost:3000/especialidades/${idEspecialidad}`);
        if (!response.ok) throw new Error("Error al obtener los datos");//linea optimizada
        const data = await response.json();// datos recibe toda la info del fetch
  
        // Llamamos a la función para actualizar el modal
        actualizarModal(data);
      } catch (error) {
        console.error("Hubo un problema:", error);
      }
    }
  });
  
  // Función para actualizar el contenido del modal
  function actualizarModal(data) {
    // Referencias a los elementos del modal
    const modal = document.querySelector(".modal");
    const idField = modal.querySelector(".info-especialidades li:nth-child(1) span:last-child");//no entiendo aun
    const nombreField = modal.querySelector(".info-especialidades li:nth-child(2) span:last-child");
    const descripcionField = modal.querySelector(".info-especialidades li:nth-child(3) span:last-child");
    const fechaField = modal.querySelector(".info-especialidades li:nth-child(4) span:last-child");
    const imgField = modal.querySelector(".previa-img img");
    const btnEliminar = modal.querySelector(".btn-eliminar");
  
    // Asignamos los valores dinámicos
    idField.textContent = data.id_especialidad_medica;
    nombreField.textContent = data.nombre_especialidad_med;
    descripcionField.textContent = data.descripcion_especialidad_med;
    fechaField.textContent = data.fecha_alta_especialidad_med;
    imgField.src = data.imgURL || ""; // Si no hay imagen, dejamos vacío
    imgField.alt = data.nombre_especialidad_med;
    // Configuramos el botón de eliminación con el ID correcto
    btnEliminar.dataset.id = data.id_especialidad_medica;
  
    // Mostramos el modal
    modal.style.display = "block";
  }
  
  // Evento para cerrar el modal al hacer clic en "Cancelar"
  document.querySelector(".btn-cancelar").addEventListener("click", () => {
    document.querySelector(".modal").style.display = "none";
  });
  
  // Evento para eliminar la especialidad
  document.querySelector(".btn-eliminar").addEventListener("click", async (event) => {
    const idEspecialidad = event.target.dataset.id;
  
    try {
      const response = await fetch(`http://localhost:3000/especialidades/${idEspecialidad}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar el registro");
      alert("Registro eliminado con éxito");
      document.querySelector(".modal").style.display = "none"; // Cierra el modal después de eliminar
    } catch (error) {
      console.error("Hubo un problema al eliminar:", error);
      alert("Hubo un problema al eliminar:", error)
    }
  });
  