document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-Create-EspMedicas");

  if (!form) {
    console.error("form no encontrado en el DOM");
    return;
  }

  const inputNombreEspecialidad = document.getElementById("nombreEspecialidadMedica");
  const inputDescripcionMed = document.getElementById("descripcionMed");
  const imagenUrl = document.getElementById("imagenUrl");
  const errorMsgInput = document.getElementById("error-msg-input");
  const errorMsgTextarea = document.getElementById("error-msg-textarea")

  const regex = /^[,a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  function validarInputs(input) {
    if (!regex.test(input.value)) {
      errorMsgInput.style.display = "block";
      input.value = input.value.replace(/[^,a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      setTimeout(() => (errorMsgInput.style.display = "none"), 5000);
      return;
    } else {
      errorMsgInput.style.display = "none";
    }if(input.value.length > 50){
      errorMsgInput.style.display = "block";
      input.value = input.value.slice(0, 50);//corta el contenido que supera los 250
      setTimeout(() => (errorMsgInput.style.display = "none"), 5000);
      return;
    }
  }

  function validarTextarea(textarea){
    if(!regex.test(textarea.value)){
      errorMsgTextarea.style.display = "block";
      textarea.value= textarea.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      setTimeout(() => (errorMsgTextarea.style.display = "none"), 5000);
      return;
    } else {
      errorMsgTextarea.style.display = "none";
    }
    if(textarea.value.length > 250){
      errorMsgTextarea.style.display = "block";
      textarea.value = textarea.value.slice(0, 250);//corta el contenido que supera los 250
      setTimeout(() => (errorMsgTextarea.style.display = "none"), 5000);
      return;
    }
  }

  inputNombreEspecialidad.addEventListener("input", function () {
    validarInputs(inputNombreEspecialidad);
  });

  inputDescripcionMed.addEventListener("input", function () {
    validarTextarea(inputDescripcionMed);
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("formulario encontrado, ejecutando fetch...");

    const nombreEspecialidadMedica = inputNombreEspecialidad.value.trim();
    const descripcionMed = inputDescripcionMed.value.trim();

    if (!nombreEspecialidadMedica || !descripcionMed) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    if (!imagenUrl || !imagenUrl.files || imagenUrl.files.length === 0) {
      console.error("El input de imagen no fue encontrado en el DOM o está vacío.");
      return;
    }

    const file = imagenUrl.files[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      alert("El archivo debe ser una imagen válida (JPEG, PNG, GIF).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;

      image.onload = async () => {
        if (image.width !== 300 || image.height !== 400) {
          alert("La imagen debe ser de 300x400 px.");
          return;
        }

        console.log("Imagen válida, procesando...");

        const formData = new FormData();
        formData.append("nombreEspecialidadMedica", nombreEspecialidadMedica);
        formData.append("descripcionMed", descripcionMed);
        formData.append("imagenUrl", file);

        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        console.log("Iniciando solicitud fetch...");

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
          window.location.href = "http://localhost:3000/adminHome/verEspecialidades/";
        } catch (error) {
          console.error("Error:", error);
          alert("Hubo un error inesperado. Inténtalo de nuevo.");
        }
      };

      image.onerror = () => {
        alert("No se pudo cargar la imagen.");
      };
    };

    reader.readAsDataURL(file);
  });
});
