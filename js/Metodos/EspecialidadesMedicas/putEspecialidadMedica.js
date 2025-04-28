//url ir a /adminHome/modificarEspecialidad


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-Modify-EspMedicas");
  
    if (!form) {
      console.error("form no encontrado en el DOM");
      return;
    }
  
    const inputNombreEspecialidad = document.getElementById("nombreEspecialidadMedica");
    const inputDescripcionMed = document.getElementById("descripcionMed");
    const imagenUrl = document.getElementById("imagenUrl");
    const errorMsg = document.getElementById("error-msg");

    function mostrarError(mensaje){
        errorMsg.textContent = "mensaje";
        setTimeout(() => (errorMsg.textContent = ""), 6000);
    }
  
    const regex = /^[,a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
  
    function validarInput(input){ //imput en el form osea nombre de especialidad medica

        if (!input.value.trim()) {
            mostrarError("El nombre de la especialidad medica es necesaria");
            return false;
        }
        if(!regex.test(input.value)) {//si el test de regex con el valor del input es diferente
            mostrarError("No se admiten caracteres especiales ni numeros");
            input.value = input.value.replace(/[^,a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");//el caracter que no coincide es reemplazado por "" 
            return false;
        } 
        if(input.value.length > 50){
            mostrarError("Solo se admiten 50 caracteres");
            input.value = input.value.slice(0, 50);//corta el contenido que supera los 250
            return false;
        }
        return true;
    }
  
    function validarTextarea(textarea){

        if(!regex.test(textarea.value)){
            mostrarError("No se admiten caracteres especialies ni numeros");
            textarea.value= textarea.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
            return false;
        }
        if(textarea.value.length > 250){
            mostrarError("No debe superar los 250 caracteres");
            textarea.value = textarea.value.slice(0, 250);//corta el contenido que supera los 250
            return false;
        }
        if(input.value.length < 10){
            mostrarError("Debes describir la especialidad medica");
            return false;
        }
        return true;
    }
  
    inputNombreEspecialidad.addEventListener("input", function () {
      validarInput(inputNombreEspecialidad);
    });
  
    inputDescripcionMed.addEventListener("input", function () {// no deberia ser textatrea?
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
        mostrarError("El archivo debe ser una imagen válida (JPEG, PNG, GIF).");
        return false;
      }
  
      const reader = new FileReader();
      reader.onload = (event) => {
        const image = new Image();
        image.src = event.target.result;
  
        image.onload = async () => {
          if (image.width !== 300 || image.height !== 400) {
            mostrarError("La imagen debe ser de 300x400 px.");
            return false;
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
          return true;
        };
  
        image.onerror = () => {
          mostrarError("No se pudo cargar la imagen.");
        };
      };
  
      reader.readAsDataURL(file);
    });
  });
  