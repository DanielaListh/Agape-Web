// cambiar las variables por las de caracteristicas
document.addEventListener("DOMContentLoaded", function () {

    //trae y muestra los datos obtenidos del registro al formulario
    const params = new URLSearchParams(window.location.search);
    const idCaracteristica = params.get("id");

    if (idCaracteristica) {
        // Hacer fetch con ese ID
        fetch(`http://localhost:3000/caracteristicasClinicas/${idCaracteristica}`)
        .then(res => res.json())
        .then(data => mostrarDataForm(data))
        .catch(err => console.error("Error al traer datos:", err));
    }

    const form = document.getElementById("form-Modify-Caracteristicas");
  
    if (!form) {
        console.error("form no encontrado en el DOM");
        return;
    }

    const inputBusqueda = document.getElementById('inputNombreCaracteristica');
    const selectCoincidencias = document.getElementById('listaCoincidencias');
    const parrafoError = document.getElementById("p-error");

    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

    function mostrarParrafoError(mensaje) {
        parrafoError.textContent = mensaje;
        setTimeout(() => (parrafoError.textContent = ""), 6000);
    }

    // busqueda get con fetch de los registros de caracteristicas
    // Escuchar la escritura del usuario
    inputBusqueda.addEventListener('input', async function () { // escuhamos a lo que sea ingresado por el input
        const valor = inputBusqueda.value.trim();// toma el valor que trae lo que se coloco en ese input
        if (valor.length < 1){
            selectCoincidencias.style.display = 'none';
            return false;
        }

        if(!regex.test(valor)){
            mostrarParrafoError("no se admiten numeros ni caracteres especiales");
            selectCoincidencias.style.display = 'none';
            return;
        }

        //inicio del get
        try {
            const response = await fetch(`http://localhost:3000/caracteristicasClinicas?nombre=${encodeURIComponent(valor)}`);
            if (!response.ok) throw new Error("Error al buscar caracteristicas");
            const caracteristicas = await response.json();
            mostrarCoincidencias(caracteristicas);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            selectCoincidencias.style.display = 'none';
        }
    });

  //mostrar las coincidencias del get en un select options
    function mostrarCoincidencias(caracteristicas) {
        // si el largo de las caracteristicas es 0 entonces que no se puestre el listado de caracteristicas
        if (caracteristicas.length === 0) {
            selectCoincidencias.style.display = 'none';
            return;
        }
        //render
        selectCoincidencias.innerHTML = ''; // Limpiar previas
        caracteristicas.forEach(caracteristica => {
            const option = document.createElement('option');
            option.value = caracteristica.nombrecaracterClinica;//muestra el valor
            option.textContent = caracteristica.nombrecaracterClinica;// y el contexto del texto
            selectCoincidencias.appendChild(option);// option estara dentro de la lista de coincidencias
        });
        selectCoincidencias.style.display = 'block';//mostrar las caracteristicas en la lista
    }

    //Cuando el usuario selecciona una coincidencia
    selectCoincidencias.addEventListener('change', async function () {
    const nombreSeleccionado = selectCoincidencias.value;// nombre seleccionado es el valor traido de selectCoincidencias
    selectCoincidencias.style.display = 'none';// al seleccionar una concidencia ya correcta, se quita el menu

    try {
      //const response = await fetch(`http://localhost:3000/especialidades/${nombreSeleccionado}`);
      const response = await fetch(`http://localhost:3000/caracteristicasClinicas/${encodeURIComponent(nombreSeleccionado)}`);

        if (!response.ok) {
            mostrarParrafoError("Error al obtener la caracteristica seleccionada");
            return;
        }

        const data = await response.json();
        mostrarDataForm(data); //función ya existente
        selectCoincidencias.style.display = 'none';
        // prueba para ver lo que trae data
        console.log("inicio de data");
        console.log(data);
        console.log("fin de data");
        } catch (error) {
            console.error("Error al obtener la caracteristica:", error);
        }
  });


  const idCaracteristicaClinica = document.getElementById("spamId");
  const fechaActualizacion = document.getElementById("spamFecha");
  const nombreCaracteristica = document.getElementById("nombreCaractClinica");
  const descripcionCaracteristica = document.getElementById("descripcionCaract");
  const imagenCaracteristica = document.getElementById("imagenCaractClinica");//puede haber error##

  // mostrar la especialidad seleccionada
  function mostrarDataForm(caracteristica) {

    if(Array.isArray(caracteristica)){
      caracteristica = caracteristica[0];
    }

    if(!caracteristica || !caracteristica.idCaracteristicaClinica){
      mostrarParrafoError("no se encontraron resultados de la caracteristica");
      return;
    }

    const baseUrl = "http://localhost:3000/";
    //const imgURL = baseUrl + especialidad.imagenEspecialidadMedica;
    //const imgURL = baseUrl + caracteristica.imgcaracterClinica.replace('./', '');
    const imgUrl = new URL(caracteristica.imgcaracterClinica.replace('./',''), baseUrl).href;


    idCaracteristicaClinica.textContent = caracteristica.idCaracteristicaClinica;
    nombreCaracteristica.value = caracteristica.nombrecaracterClinica;
    descripcionCaracteristica.value = caracteristica.descripcioncaracterClinica;
    fechaActualizacion.textContent = caracteristica.fecha_actualizacion;
    imagenCaracteristica.src = imgUrl;///////////////

    // se busca formatear la fecha para presentarla en el front de una manera mas accesible
    const fechaFormat = new Date(fechaActualizacion).toISOString().split("T")[0];
    fechaActualizacion.value = fechaFormat;

    console.log("caracteristica cargada", caracteristica);

  }


  //VALIDAR LOS INPUTS ANTES DEL EVENTO SUBMIT DE PUT// 
  const errorMsgNombre = document.getElementById("error-msg-nombre");
  const errorMsgDescripcion = document.getElementById("error-msg-descripcion");
  const errorMsgImagen = document.getElementById('error-msg-imagen');

  //se hacen varias funciones de mostrar error porque los errores se 
  //muestran en lugares diferentes dependiendo de cada input
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
    if (!input.value.trim()) {// en el parentesis verde falta input?
      mostrarErrorMsgNombre("El nombre de la caracteristica es necesaria");
      return false;
    }
    if(!regexInput.test(input.value)) {//si el test de regex con el valor del input es diferente
      mostrarErrorMsgNombre("No se admiten caracteres especiales ni numeros");
      input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");//el caracter que no coincide es reemplazado por "" 
      return false;
    } 
    if(input.value.length > 35){
      mostrarErrorMsgNombre("Como maximo se admiten 35 caracteres");
      input.value = input.value.slice(0, 35);//corta el contenido que supera los 250
      return false;
    }
    return true;
  }

  function validarTextarea(input){
    if (!input.value.trim()) {
      mostrarErrorMsgDescripcion("La descripcion de la caracteristica es necesaria");
      return false;
    }
    if(!regexTextarea.test(input.value)){
      mostrarErrorMsgDescripcion("No se admiten numeros ni caracteres especiales");
      input.value= input.value.replace(/[^,.a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
      return false;
    }
    if(input.value.length < 10){
      mostrarErrorMsgDescripcion("La descripcion de la caracteristica debe ser mayor a 10 caracteres");
      return false;
    }
    if(input.value.length > 200){
      mostrarErrorMsgDescripcion("No debe superar los 200 caracteres");
      input.value = input.value.slice(0, 200);//corta el contenido que supera los 250
      return false;
      }
    return true;
  }


  //recordar los nombres de las  constantes, estan definidas arriba
  //const idCaracteristicaClinica = document.getElementById("spamId");
  //const fechaActualizacion = document.getElementById("spamFecha");
  //const nombreCaracteristica = document.getElementById("nombreCaractClinica");
  //const descripcionCaracteristica = document.getElementById("descripcionCaract");
  
  
  nombreCaracteristica.addEventListener("input", function () {
    validarInput(nombreCaracteristica);
  });

  descripcionCaracteristica.addEventListener("input", function () {// no deberia ser textatrea?
    validarTextarea(descripcionCaracteristica);
  });


  //hacer el put
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    console.log("formulario encontrado, ejecutando fetch...");

    //const idCaracteristicaClinica = document.getElementById("spamId");

    //pasamos el valor sin espacios de lo recibido en los
    const nombreInput = nombreCaracteristica.value.trim();
    const descripcionInput = descripcionCaracteristica.value.trim();
    const idCaracteristicaClinica = document.getElementById("spamId").textContent;

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

    //quedamos en mejorar el front con la imagen traida del back
    const reader = new FileReader();
    reader.onload = (event) => {
      const image = new Image();
      // el recurso de la imagen sera lo que el evento encuentre como resultado
      image.src = event.target.result;

      image.onload = async () => {
        if (image.width !== 256 || image.height !== 256) {
          mostrarErrorMsgImagen("La imagen debe ser de 256 x 256px.");
          return false;
        }

        console.log("Imagen válida, procesando...");

        const formData = new FormData();
        //form data tiene clave y valor
        //la clave es lo que construimos en el back y el valor lo que traemos desde el front
        formData.append("nombrecaracterClinica", nombreInput);
        formData.append("descripcioncaracterClinica", descripcionInput);
        formData.append("imagenUrl", file);

        //deteccion de errores
        for(let [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

        console.log("Iniciando solicitud fetch...");
        
        try{
          const response = await fetch(`http://localhost:3000/caracteristicasClinicas/${idCaracteristicaClinica}`, {
            method: "PUT",
            body: formData,
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Error en la solicitud");
          }

          alert("Caracteristica modificada con éxito.");
          form.reset();
          window.location.href = "http://localhost:3000/adminHome/verCaracteristicasClinicas/";
        } catch (error) {
          console.error("Error:", error);
          alert("Hubo un error inesperado. Inténtalo de nuevo.");
        }
        return true;
      };

      // es parte de onload,cuando carga el arcivo ayuda a saber si se ha cargado 
      // con las caracteristicas correctas
      image.onerror = () => {
        mostrarError("No se pudo cargar la imagen.");
      };
    };

    reader.readAsDataURL(file);
  });
});