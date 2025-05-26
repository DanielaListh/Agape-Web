// OBTENER LAS ESPECIALIDADES MEDICAS DE LA BBDD TRAIDAS CON FETCH Y MOSTRARLAS EN EL FRONT

//obtiene todas las especialidades medicas existentes automaticamente
async function ObtenerGeneros() {
  const link='http://localhost:3000/generos/';

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
      //setTimeout(() => {
        //tablaContenedor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      //}, 300);
    }
    catch(error){
      console.error('Hubo un problema con la solicitud: ' + error); // los errores los vere en la consola
    }
  }


//obtener solo UNA especialidad medica mediante el nombre Y TRAERLA AL FRONT
async function buscarGenero(){
  const parrafoError = document.querySelector(".p-error");
  const nombreGenero = document.getElementById('nombreGenero').value;
  const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

  //////meter en un listening el documento para que mientras el usuario escribe le detecte el error
  function mostrarError(mensaje){
    parrafoError.textContent = mensaje;
    setTimeout(() => parrafoError.textContent = "", 6000);
  }

  if (!nombreGenero){// si el nombre del genero no esta
    //alert("no se proporcionaron datos suficientes en la busqueda");
    mostrarError("no se proporcionaron datos en la busqueda");
    return;
  }

  if (!regex.test(nombreGenero)) {
    //alert("Solo se permiten letras en la búsqueda");
    mostrarError("Solo se permiten letras en la búsqueda");
    nombreGenero = nombreGenero.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");// no funciona esta linea porque no esta en un evento listener
    return;
  }

  try {
      const response = await fetch(`http://localhost:3000/generos/${nombreGenero}`);
      if (!response.ok) {
        if(response.status === 404){
          //alert("No se encontro la especialidad buscada");
          mostrarError("No se encontro el genero buscado");
        } else {
          throw new Error('Error: ' + response.statusText);
        }
        return;
      }
      
      const data = await response.json();
      mostrarEnTabla(data); //mostrar el resultado de la busqueda en la tabla, antes data estaba dentro de [], lo que hacia que trajera
      //resultados undefined.
      //displayEspecialidad(data);
    } catch (error) {
      mostrarError("Lo sentimos, ocurrio un error inesperado con el servidor");
      setTimeout(() => parrafoError.textContent = "", 6000);
      alert(error.message);
  }
}

function mostrarEnTabla(data){
  const contenedorTabla = document.getElementById('tabla-generos');

  if (data.length === 0) {// si el resultado es nulo traido de la bbdd entonces que muestre el mensaje
    contenedorTabla.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }
  //base del link para tener el path absoluto de las img
  //const baseUrl="http://localhost:3000/"; // la barra al final / es importante para cumplir con toda la ruta

  //creo la tabla y el encabezado
  let tabla = '<table><thead><tr><th>ID</th><th>Nombre</th><th><th></th></th></tr></thead><tbody>';

  //add las filas de datos
  data.forEach(generos => {

    //url completa de las img
    //const imgURL = baseUrl + especialidad.imagen_especialidad_med;

      tabla += `
      <tr>
        <td>${generos.id_genero}</td>
        <td>${generos.nombre_genero}</td>
        <td class="btn-edit">
          <button data-id-genero ="${generos.id_genero}">
            <img src=/css/Imagenes/edit.png alt="editar" width="30">
          </button>
        </td>
        <td class="btn-trash">
          <button data-id-genero ="${generos.id_genero}">
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

  //el evento de escucha del boton refrescar, espera que se haga click para ser usado
document.getElementById('btn-refrescar-get').addEventListener('click', () => {
  ObtenerGeneros();
});

  /////////////////////////
//el evento al boton de busqueda
document.getElementById('btn-buscar-genero').addEventListener('click', () => {
  buscarGenero();
});

/////////////////////////

// llama a la funcion de manera automatica al cargar la pag, sin necesidad del refresh
document.addEventListener('DOMContentLoaded', ObtenerGeneros());