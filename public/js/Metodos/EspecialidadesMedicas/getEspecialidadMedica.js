// OBTENER LAS ESPECIALIDADES MEDICAS DE LA BBDD TRAIDAS CON FETCH Y MOSTRARLAS EN EL FRONT

//obtiene todas las especialidades medicas existentes automaticamente
async function ObtenerEspecialidadesMedicas() {
  const link='http://localhost:3000/especialidades/';

  try{
    const res = await fetch(link); // traemos de la bbdd las especialidades medicas a travez del link

    if(!res.ok){
      throw new Error('Error en la solicitud: ' + res.status);
    }
    const data = await res.json(); // data es un array de objetos que contiene las especialidades médicas obtenidas del servidor
    console.log(data);
    mostrarEnTabla(data);//pasamos explícitamente el array data como argumento a la función mostrarEnTabla 

    // mover hacia arriba de la tabla pero no anda bien ya que no va hasta el extremo superior del div
    //const tablaContenedor = document.getElementById('tabla-especialidades-medicas');
    //tablaContenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      tablaContenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }
  catch(error){
    console.error('Hubo un problema con la solicitud: ' + error); // los errores los vere en la consola
  }
}

// funciones de validaciones
const inputNombre = document.getElementById('nombreEspecialidadMedica');
const errorMsgInput = document.getElementById("p-error");

function mostrarErrorInput(mensaje){
  errorMsgInput.textContent = mensaje;
  setTimeout(() => (errorMsgInput.textContent = ""), 6000);
}

const regexInput = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

function validarBusquedaInput(input){

  if (!input.value.trim()){
    mostrarErrorInput("no se proporcionaron datos suficientes en la busqueda");
    return false;
  }
  if (!regexInput.test(input.value)){
    mostrarErrorInput("Solo se permiten letras en la búsqueda");
    input.value = input.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");
    return false;
  }
  if(input.value.length > 10){
    mostrarErrorInput("superaste el maximo de caracteres");
    input.value = input.value.slice(0, 10);//corta el contenido que supera los 250
    return false;
  }
    
  errorMsgInput.textContent = "";//esto es dinamico?
  return true;
}

inputNombre.addEventListener("input", (event) => {
  validarBusquedaInput(inputNombre);// pasar el elemento completo
});

//obtener solo UNA especialidad medica mediante el nombre Y TRAERLA AL FRONT
async function buscarEspecialidad(){
  const nombreEspecialidadMedica = inputNombre.value.trim();

  try {
    const response = await fetch(`http://localhost:3000/especialidades/${nombreEspecialidadMedica}`);
    if (!response.ok) {
      if(response.status === 404){
        //alert("No se encontro la especialidad buscada");
        const parrafoError = document.querySelector(".p-error");
        parrafoError.textContent = "No se encontro la especialidad buscada";
        setTimeout(() => parrafoError.textContent = "", 7000);
      } else {
        throw new Error('Error: ' + response.statusText);
      }
      return;
    }
      
    const data = await response.json();
    mostrarEnTabla(data); //mostrar el resultado de la busqueda en la tabla, antes data estaba dentro de [], lo que hacia que trajera
    //resultados undefined.
    //displayEspecialidad(data);
  }
  catch (error) {
    const parrafoError = document.querySelector(".p-error");
    parrafoError.textContent = "Lo sentimos, ocurrio un error inesperado";
    setTimeout(() => parrafoError.textContent = "", 6000);
    alert(error.message);
  }
}



function mostrarEnTabla(data){
  const contenedorTabla = document.getElementById('tabla-especialidades-medicas');

  if (data.length === 0) {// si el resultado es nulo traido de la bbdd entonces que muestre el mensaje
    contenedorTabla.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }
  //base del link para tener el path absoluto de las img
  const baseUrl="http://localhost:3000/"; // la barra al final / es importante para cumplir con toda la ruta

  //creo la tabla y el encabezado
  let tabla = '<table><thead><tr><th>ID</th><th>Nombre</th><th>Descripción</th><th>Fecha de Alta</th><th>Imagen</th><th><th></th></th></tr></thead><tbody>';

  //add las filas de datos
  data.forEach(especialidad => {

    //url completa de las img
    const imgURL = baseUrl + especialidad.imagen_especialidad_med;

      tabla += `
      <tr>
        <td>${especialidad.id_especialidad_medica}</td>
        <td>${especialidad.nombre_especialidad_med}</td>
        <td>${especialidad.descripcion_especialidad_med}</td>
        <td>${especialidad.fecha_alta_especialidad_med}</td>
        <td><img src="${imgURL}" width="200"></td>
        <td class="btn-edit">
          <button data-id-especialidad="${especialidad.id_especialidad_medica}">
            <img src=/css/Imagenes/edit.png alt="editar" width="30">
          </button>
        </td>
        <td class="btn-trash">
          <button data-id-especialidad="${especialidad.id_especialidad_medica}">
            <img src=/css/Imagenes/delete.png alt="eliminar" width="30">
          </button>
        </td>
      </tr>
      `
  });

  tabla += '</tbody></table>';

  //insertar la tabla en el contenedor
  contenedorTabla.innerHTML = tabla;
}

//////////////////////

// agregado de eneto al hacer click en el btn de editar, toma el id del registro y lo redirecciona al  form para editar
document.addEventListener("click", (event) =>{
  const btnEdit = event.target.closest(".btn-edit button");
  if(btnEdit){
    const idEspecialidad = btnEdit.getAttribute("data-id-especialidad");
    if(idEspecialidad){
      window.location.href = `http://localhost:3000/adminHome/modificarEspecialidad?id=${idEspecialidad}`;
      //observar que se coloca `` para el enlace, esto ayuda a el string con interpolacion, a que la variable pueda pasar por una
      //variable en la ruta 
    }
  }
});


//////////////////////

//el evento de escucha del boton refrescar, espera que se haga click para ser usado
document.getElementById('btn-refrescar-get').addEventListener('click', () => {
  ObtenerEspecialidadesMedicas();
});

  /////////////////////////
//el evento al boton de busqueda
document.getElementById('btn-buscar-especialidad').addEventListener('click', () => {
  buscarEspecialidad();
});

/////////////////////////

// llama a la funcion de manera automatica al cargar la pag, sin necesidad del refresh
document.addEventListener('DOMContentLoaded', ObtenerEspecialidadesMedicas);