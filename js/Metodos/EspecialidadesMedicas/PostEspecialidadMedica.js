// script para crear las especialidades medicas del front del lado del 
//administrador para que se muestren en el front del modulo ADMIN
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-Create-EspMedicas");

  if (!form) return;// si el formulario es nullo indefinido  lo retorna

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nombreEspecialidadMedica = document.getElementById("nombreEspecialidadMedica").value.trim();
    const descripcionMed = document.getElementById("descripcionMed").value.trim();
    const imagenPost = document.getElementById("imagenPost");

    if (!nombreEspecialidadMedica || !descripcionMed) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (!imagenPost.files.length) {
      alert("Por favor, sube una imagen válida.");
      return;
    }

    const file = imagenPost.files[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      alert("El archivo debe ser una imagen válida (JPEG, PNG, GIF). ");
      return;
    }

    const formData = new FormData();
    formData.append("nombreEspecialidad", nombreEspecialidadMedica);//coloque el primer valor con nombre del controler
    formData.append("descripcionMed", descripcionMed);
    formData.append("imagenUrl", file);//cuidado con el nombre de la clave

    for (let [key, value] of formData.entries()) {// para las variables clave, valor de las entradas del evento formData
      console.log(`${key}:`, value);// muestra las claves y los valores
    }
    

    try {
      const response = await fetch("http://localhost:3000/especialidades/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error en la solicitud");
      }

      alert("Especialidad médica creada con éxito.");
      form.reset();
      window.location.href = 'http://localhost:3000/adminHome/crearEspecialidad/';
      
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error inesperado. Inténtalo de nuevo.");
    }
  });
});
