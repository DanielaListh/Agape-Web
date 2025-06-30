document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-Create-CaracteristicaClinica");

  if (!form) {
    console.error("form no encontrado en el DOM");
    return;
  }

  const inputNombreCaracteristica = document.getElementById("nombreCaracteristica");
  const inputDescripcionCaracteristica = document.getElementById("descripcionCaracteristica");
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
      mostrarErrorMsgNombre("El nombre de la caracteristica clinica es necesaria");
      return false;
    }
    if(!regexInput.test(input.value)) {//si el test de regex con el valor del input es diferente
      mostrarErrorMsgNombre("No se admiten caracteres especiales ni numeros");
      input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");//el caracter que no coincide es reemplazado por "" 
      return false;
    } 
    if(input.value.length > 20){
      mostrarErrorMsgNombre("Como maximo se admiten 20 caracteres");
      input.value = input.value.slice(0, 20);//corta el contenido que supera los 250
      return false;
    }
    return true;
  }

  function validarTextarea(input){
    if (!input.value.trim()) {
      mostrarErrorMsgDescripcion("La descripcion de la caracteristica clinica es necesaria");
      return false;
    }
    if(!regexTextarea.test(input.value)){
      mostrarErrorMsgDescripcion("No se admiten numeros ni caracteres especiales");
      input.value= input.value.replace(/[^,.a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      return false;
    }
    if(input.value.length < 10){
      mostrarErrorMsgDescripcion("La caracteristica debe ser mayor a 10 caracteres");
      return false;
    }
    if(input.value.length > 100){
      mostrarErrorMsgDescripcion("La caracteristica no debe superar los 100 caracteres");
      input.value = input.value.slice(0, 100);//corta el contenido que supera los 250
      return false;
      }
    return true;
  }

  inputNombreCaracteristica.addEventListener("input", function () {
    validarInput(inputNombreCaracteristica);
  });

  inputDescripcionCaracteristica.addEventListener("input", function () {// no deberia ser textatrea?
    validarTextarea(inputDescripcionCaracteristica);// si no sirve ver en html y ponerle input en ves de textarea
  });

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("formulario encontrado, ejecutando fetch...");

    const nombreCaracteristica = inputNombreCaracteristica.value.trim();
    const descripcionCaracteristica = inputDescripcionCaracteristica.value.trim();

    if (!nombreCaracteristica || !descripcionCaracteristica) {
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

    //podemos validar aqui todo sobre img!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const reader = new FileReader(); // el file reader permite leer el archivo que se va a cargar
    reader.onload = (event) => { // el metodo onload permite que al cargar un archivo lo verifique sin mandar una peticion
      const image = new Image();
      image.src = event.target.result;

      image.onload = async () => {
        if (image.width !== 80 || image.height !== 80) {
          mostrarErrorMsgImagen("La imagen debe ser de 80*80px.");
          return;
        }

        console.log("Imagen válida, procesando...");

        const formData = new FormData();
        formData.append("nombrecaracterClinica", nombreCaracteristica);
        formData.append("descripcioncaracterClinica", descripcionCaracteristica);
        formData.append("imagenUrl", file);

        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        console.log("Iniciando solicitud fetch...");

        try {
          const response = await fetch("http://localhost:3000/caracteristicasClinicas/", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en la solicitud");
          }

          alert("Caracteristica Clinica creada con éxito.");
          form.reset();
          window.location.href = "http://localhost:3000/adminHome/verEspecialidades/"; // mientras dejamos esta linea hasta no tener armado el maquetado de ver caracteristicas
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