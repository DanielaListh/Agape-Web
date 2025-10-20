document.addEventListener("DOMContentLoaded", function () {

  //trae y muestra los datos obtenidos del registro al formulario
  const params = new URLSearchParams(window.location.search);
  const idEspecialidad = params.get("id");

  if (idEspecialidad) {
    // Hacer fetch con ese ID
    fetch(`http://localhost:3000/especialidades/${idEspecialidad}`)
      .then(res => res.json())
      .then(data => mostrarDataForm(data))
      .catch(err => console.error("Error al traer datos:", err));
  }

  const form = document.getElementById("form-Modify-EspMedicas");
  
  if (!form) {
    console.error("form no encontrado en el DOM");
    return;
  }

  const inputBusqueda = document.getElementById('inputNombreEspecialidadMedica');
  const selectCoincidencias = document.getElementById('listaCoincidencias');
  const parrafoError = document.getElementById("p-error");
  const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

  function mostrarParrafoError(mensaje) {
    parrafoError.textContent = mensaje;
    setTimeout(() => (parrafoError.textContent = ""), 6000);
  }

  // Escuchar la escritura del usuario
  inputBusqueda.addEventListener('input', async function () { // escuhamos a lo que sea ingresado por el input
    const valor = inputBusqueda.value.trim();
    if (valor.length < 1){
      selectCoincidencias.style.display = 'none';
      return false;
    }

    if(!regex.test(valor)){
      mostrarParrafoError("no se admiten numeros ni caracteres especiales");
      selectCoincidencias.style.display = 'none';
      inputBusqueda.value = inputBusqueda.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");//el caracter que no coincide es reemplazado por "" 
      return;
    }
    if(inputBusqueda.value.length > 10){
      mostrarParrafoError("Como maximo se admiten 10 caracteres");
      inputBusqueda.value = inputBusqueda.value.slice(0, 10);//corta el contenido que supera los 250
      return;
    }

    //inicio del get
    try {
      const response = await fetch(`http://localhost:3000/especialidades?nombre=${encodeURIComponent(valor)}`);
      if (!response.ok) throw new Error("Error al buscar especialidades");

      const especialidades = await response.json();
      mostrarCoincidencias(especialidades);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      selectCoincidencias.style.display = 'none';
    }
  });

  //mostrar las coincidencias del get en un select options
    function mostrarCoincidencias(especialidades) {
      if (especialidades.length === 0) {
        selectCoincidencias.style.display = 'none';
        return;
      }

    selectCoincidencias.innerHTML = ''; // Limpiar previas
    especialidades.forEach(especialidad => {
      const option = document.createElement('option');
      option.value = especialidad.nombre_especialidad_med;
      option.textContent = especialidad.nombre_especialidad_med;
      selectCoincidencias.appendChild(option);
    });

    selectCoincidencias.style.display = 'block';
  }

  // Cuando el usuario selecciona una coincidencia
    selectCoincidencias.addEventListener('change', async function () {
    const nombreSeleccionado = selectCoincidencias.value;
    selectCoincidencias.style.display = 'none';// al seleccionar una concidencia ya correcta, se quita el menu

    try {
      //const response = await fetch(`http://localhost:3000/especialidades/${nombreSeleccionado}`);
      const response = await fetch(`http://localhost:3000/especialidades/${encodeURIComponent(nombreSeleccionado)}`);

      if (!response.ok) {
        mostrarParrafoError("Error al obtener la especialidad seleccionada");
        return;
      }

      const data = await response.json();
      mostrarDataForm(data); // Tu función ya existente
      selectCoincidencias.style.display = 'none';
      // prueba para ver lo que trae data
      console.log("inicio de data");
      console.log(data);
      console.log("fin de data");
      } catch (error) {
        console.error("Error al obtener la especialidad:", error);
      }
  });


  const idEspecialidadMedica = document.getElementById("spamId");
  const fechaOriginal = document.getElementById("spamFecha");
  const nombreEspecialidadMedica = document.getElementById("nombreEspecialidadMedica");
  const descripcionEspecialidadMedica = document.getElementById("descripcionMed");
  const imagenEspecialidadMedica = document.getElementById("imagenActual");

  // mostrar la especialidad seleccionada
  function mostrarDataForm(especialidad) {

    if(Array.isArray(especialidad)){
      especialidad = especialidad[0];
    }

    if(!especialidad || !especialidad.id_especialidad_medica){
      mostrarParrafoError("no se encontraron resultados de la especialidad");
      return;
    }

    const baseUrl = "http://localhost:3000/";
    //const imgURL = baseUrl + especialidad.imagenEspecialidadMedica;
    //const imgURL = baseUrl + especialidad.imagen_especialidad_med.replace('./', '');
    const imgURL = new URL(especialidad.imagen_especialidad_med.replace('./',''), baseUrl).href;
    //////////////////////////// CUIDAO DE ERROR


    idEspecialidadMedica.textContent = especialidad.id_especialidad_medica;
    nombreEspecialidadMedica.value = especialidad.nombre_especialidad_med;
    descripcionEspecialidadMedica.value = especialidad.descripcion_especialidad_med;
    fechaOriginal.textContent = especialidad.fecha_alta_especialidad_med;
    imagenEspecialidadMedica.src = imgURL;

    // se busca formatear la fecha para presentarla en el front de una manera mas accesible
    const fechaFormat = new Date(fechaOriginal).toISOString().split("T")[0];
    fechaAltaEespecialidad.value = fechaFormat;

    console.log("especialidad cargada", especialidad);

  }


//VALIDAR LOS INPUTS ANTES DEL EVENTO SUBMIT DE PUT// 
const errorMsgNombre = document.getElementById("error-msg-nombre");
const errorMsgDescripcion = document.getElementById("error-msg-descripcion");
const errorMsgImagen = document.getElementById('error-msg-imagen');

// se hacen varias funciones de mostrar error porque los errores se 
// muestran en lugares diferentes dependiendo de cada input
function mostrarErrorMsgNombre(mensaje){
  errorMsgNombre.textContent = mensaje;
  setTimeout(() => (errorMsgNombre.textContent = ""), 6000);
}

function mostrarErrorMsgDescripcion(mensaje){
  errorMsgDescripcion.textContent = mensaje;
  setTimeout(() => (errorMsgDescripcion.textContent = ""), 6000);
}

function mostrarErrorMsgImagen(mensaje){
  errorMsgImagen.textContent = mensaje;
  setTimeout(() => (errorMsgImagen.textContent = ""), 6000);
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

nombreEspecialidadMedica.addEventListener("input", function () {
  validarInput(nombreEspecialidadMedica);
});

descripcionEspecialidadMedica.addEventListener("input", function () {// no deberia ser textatrea?
  validarTextarea(descripcionEspecialidadMedica);
});


  //hacer el put
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("formulario encontrado, ejecutando fetch...");

    const nombreInput = nombreEspecialidadMedica.value.trim();
    const descripcionInput = descripcionEspecialidadMedica.value.trim();
    const idEspecialidad = document.getElementById("spamId").textContent;

    if(!nombreInput){
      mostrarErrorMsgNombre("El nombre no puede quedar vacio");
      return;
    }
    if(!descripcionInput){
      mostrarErrorMsgDescripcion("La descripcion es necesaria");
      return;
    }

    if (!imagenUrl || !imagenUrl.files || imagenUrl.files.length === 0) {
      console.error("El archivo de imagen no fue encontrado en el DOM o está vacío.");
      mostrarErrorMsgImagen("El archivo de imagen no fue encontrado en el DOM");
      return;
    }

    const file = imagenUrl.files[0];
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validImageTypes.includes(file.type)) {
      mostrarErrorMsgImagen("El archivo debe ser una imagen válida (JPEG, PNG, GIF).");
      return false;
    }
 // quedamos en mejorar el front con la imagen traida del back
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      image.src = event.target.result;

      image.onload = async () => {
        if (image.width !== 300 || image.height !== 400) {
          mostrarErrorMsgImagen("La imagen debe ser de 300x400 px.");
          return false;
        }

        console.log("Imagen válida, procesando...");

        const formData = new FormData();
        formData.append("nombreEspecialidadMedica", nombreInput);
        formData.append("descripcionMed", descripcionInput);
        formData.append("imagenUrl", file);

        for (let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        console.log("Iniciando solicitud fetch...");
        

        try {
          const response = await fetch(`http://localhost:3000/especialidades/${idEspecialidad}`, {
            method: "PUT",
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en la solicitud");
          }

          alert("Especialidad médica modificada con éxito.");
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




  