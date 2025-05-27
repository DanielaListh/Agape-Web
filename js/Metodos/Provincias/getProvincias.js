// OBTENER LAS ESPECIALIDADES MEDICAS DE LA BBDD TRAIDAS CON FETCH Y MOSTRARLAS EN EL FRONT

//obtiene todas las especialidades medicas existentes automaticamente
async function ObtenerProvincias() {
  const link='http://localhost:3000/estados/';

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
async function buscarProvincia(){
  const nombreEstado = document.getElementById('nombreEstado').value;
  const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/;

  if (!nombreEstado){
    //alert("no se proporcionaron datos suficientes en la busqueda");
    const parrafoError = document.querySelector(".p-error");
    parrafoError.textContent = "no se proporcionaron datos en la busqueda";
    setTimeout(() => parrafoError.textContent = "", 6000);
    return;
  }

  if (!regex.test(nombreEstado)) {
    //alert("Solo se permiten letras en la búsqueda");
    const parrafoError = document.querySelector(".p-error");
    parrafoError.textContent = "Solo se permiten letras en la búsqueda";
    nombreEstado = nombreEstado.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, "");// no funciona esta linea porque no esta en un evento listener
    setTimeout(() => parrafoError.textContent = "", 6000);
    return;
  }

  try {
      const response = await fetch(`http://localhost:3000/estados/${nombreEstado}`);
      if (!response.ok) {
        if(response.status === 404){
          //alert("No se encontro la especialidad buscada");
          const parrafoError = document.querySelector(".p-error");
          parrafoError.textContent = "No se encontro la provincia buscada";
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
    } catch (error) {
      const parrafoError = document.querySelector(".p-error");
      parrafoError.textContent = "Lo sentimos, ocurrio un error inesperado";
      setTimeout(() => parrafoError.textContent = "", 6000);
      alert(error.message);
  }
}

function mostrarEnTabla(data){
  const contenedorTabla = document.getElementById('tabla-provincias');

  if (data.length === 0) {// si el resultado es nulo traido de la bbdd entonces que muestre el mensaje
    contenedorTabla.innerHTML = '<p>No se encontraron resultados.</p>';
    return;
  }
  //base del link para tener el path absoluto de las img
  //const baseUrl="http://localhost:3000/"; // la barra al final / es importante para cumplir con toda la ruta

  //creo la tabla y el encabezado
  let tabla = '<table><thead><tr><th>ID</th><th>Nombre</th><th><th></th></th></tr></thead><tbody>';

  //add las filas de datos
  data.forEach(provincias => {

    //url completa de las img
    //const imgURL = baseUrl + especialidad.imagen_especialidad_med;

      tabla += `
      <tr>
        <td>${provincias.id_estado}</td>
        <td>${provincias.nombre_estado}</td>
        <td class="btn-edit">
          <button data-id-estado ="${provincias.id_estado}">
            <img src=/css/Imagenes/edit.png alt="editar" width="30">
          </button>
        </td>
        <td class="btn-trash">
          <button data-id-estado ="${provincias.id_estado}">
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
  ObtenerProvincias();
});

  /////////////////////////
//el evento al boton de busqueda
document.getElementById('btn-buscar-provincia').addEventListener('click', () => {
  buscarProvincia();
});

/////////////////////////

// llama a la funcion de manera automatica al cargar la pag, sin necesidad del refresh
document.addEventListener('DOMContentLoaded', ObtenerProvincias());