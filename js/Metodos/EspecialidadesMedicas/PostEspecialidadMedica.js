// script para crear las especialidades medicas del front del lado del 
//administrador para que se muestren en el front del modulo ADMIN
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-Create-EspMedicas");

  if (!form) {
    console.error("form no encontrado en el DOM");
    return;// si el formulario es nullo indefinido  lo retorna
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("formulario encontrado, ejecutando fetch...");

    const nombreEspecialidadMedica = document.getElementById("nombreEspecialidadMedica").value.trim();
    const descripcionMed = document.getElementById("descripcionMed").value.trim();
    const imagenUrl = document.getElementById("imagenUrl");

    if (!nombreEspecialidadMedica || !descripcionMed) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if(!imagenUrl){
      console.error("el imput de imagen no fue encontrado en el DOM");
      return;
    }


    if (!imagenUrl.files.length) {
      alert("Por favor, sube una imagen válida.");
      return;
    }

    const file = imagenUrl.files[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      alert("El archivo debe ser una imagen válida (JPEG, PNG, GIF). ");
      return;
    }

    const formData = new FormData();
    formData.append("nombreEspecialidadMedica", nombreEspecialidadMedica);//coloque el primer valor con nombre del controler
    formData.append("descripcionMed", descripcionMed);
    formData.append("imagenUrl", file);//cuidado con el nombre de la clave

    for (let [key, value] of formData.entries()) {// para las variables clave, valor de las entradas del evento formData
      console.log(`${key}:`, value);// muestra las claves y los valores
    }
    
    console.log("Iniciando solicitud fetch...");

    try {
      console.log("enviando solicitud fetch...");

      const response = await fetch("http://localhost:3000/especialidades/", {
        method: "POST",
        body: formData,
      });

      console.log("solicitud fetch enviada");
      console.log("Frontend: Respuesta del servidor:", response);//para ver si realmente llega la respuesta del fetch al frontend

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }

      console.log("Post exitoso, debería mostrar alert y redireccionar");
      
      alert("Especialidad médica creada con éxito.");
      form.reset();
      //window.location.href = 'http://localhost:3000/adminHome/crearEspecialidad/';
      window.location.href = 'http://localhost:3000/adminHome/verEspecialidades/';
            
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error inesperado. Inténtalo de nuevo.");
    }
  });
});
