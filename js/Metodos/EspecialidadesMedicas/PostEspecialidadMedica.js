document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-Create-EspMedicas");

  if (!form) {
    console.error("form no encontrado en el DOM");
    return;
  }

  const inputNombreEspecialidad = document.getElementById("nombreEspecialidadMedica");
  const inputDescripcionMed = document.getElementById("descripcionMed");
  const imagenUrl = document.getElementById("imagenUrl");
  const errorMsgInput = document.getElementById("error-msg-input-post");
  const errorMsgTextarea = document.getElementById("error-msg-textarea-post");
  const errorMsgImg = document.getElementById("error-msg-img-post");

// se hacen varias funciones de mostrar error porque los errores se 
// muestran en lugares diferentes dependiendo de cada input
function mostrarErrorMsgNombre(mensaje){
  errorMsgInput.textContent = mensaje;
  setTimeout(() => (errorMsgInput.textContent = ""), 6000);
}

function mostrarErrorMsgDescripcion(mensaje){
  errorMsgTextarea.textContent = mensaje;
  setTimeout(() => (errorMsgTextarea.textContent = ""), 6000);
}

function mostrarErrorMsgImagen(mensaje){// OJO QUE NO SE ESTA USANDO
  errorMsgImg.textContent = mensaje;
  setTimeout(() => (errorMsgImg.textContent = ""), 6000);
}

const regexInput = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const regexTextarea = /^[,.a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

function validarInput(input){ //imput en el form osea nombre de especialidad medica
  if (!input.value.trim()) {
    mostrarErrorMsgNombre("El nombre de la especialidad medica es necesaria");
    return false;
  }
  if(!regexInput.test(input.value)) {//si el test de regex con el valor del input es diferente
    mostrarErrorMsgNombre("No se admiten caracteres especiales ni numeros");
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");//el caracter que no coincide es reemplazado por "" 
    return false;
  } 
  if(input.value.length > 30){
    mostrarErrorMsgNombre("Como maximo se admiten 30 caracteres");
    input.value = input.value.slice(0, 30);//corta el contenido que supera los 250
    return false;
  }
  return true;
}

function validarTextarea(input){
  if (!input.value.trim()) {
    mostrarErrorMsgDescripcion("La descripcion de la especialidad medica es necesaria");
    return false;
  }
  if(!regexTextarea.test(input.value)){
    mostrarErrorMsgDescripcion("No se admiten numeros ni caracteres especiales");
    input.value= input.value.replace(/[^,.a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    return false;
  }
  if(input.value.length < 10){
    mostrarErrorMsgDescripcion("La especialidad medica debe ser mayor a 10 caracteres");
    return false;
  }
  if(input.value.length > 200){
    mostrarErrorMsgDescripcion("No debe superar los 200 caracteres");
    input.value = input.value.slice(0, 200);//corta el contenido que supera los 250
    return false;
    }
  return true;
}

inputNombreEspecialidad.addEventListener("input", function () {
  validarInput(inputNombreEspecialidad);
});

inputDescripcionMed.addEventListener("input", function () {// no deberia ser textatrea?
  validarTextarea(inputDescripcionMed);// si no sirve ver en html y ponerle input en ves de textarea
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
      mostrarErrorMsgImagen("La imagen no fue encontrada");
      return;
    }

    const file = imagenUrl.files[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      mostrarErrorMsgImagen("El archivo debe ser una imagen(JPEG, PNG, GIF).");
      return;
    }

    //podemosvalidar aqui todo sobre img!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;

      image.onload = async () => {
        if (image.width !== 300 || image.height !== 400) {
          mostrarErrorMsgImagen("La imagen debe ser de 300*400px.");
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
