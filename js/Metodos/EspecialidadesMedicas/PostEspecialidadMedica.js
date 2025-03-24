<<<<<<< Updated upstream
// script para mostrar las especialidades medicas del front del lado del 
//administrador para que se muestren en el front del ADMIN

document.getElementById('especialidadMedicaForm').addEventListener('submit', function (event) { //eventListener captura el evento del formulario
  event.preventDefault(); // de manera asincrona manejamos el envio del formulario

  //creo un evento formData para enviar los datos que existen en el formulario, contruimos pares clave/valor que
  // representen los campos del formulario
  const formData = new FormData();
  formData.append('nombre', document.getElementById('nombreEspecialidad').value);// add el valor del campo de texto al obj FormData
  formData.append('descripcion', document.getElementById('descripcionEspecialidad').value);
  formData.append('imagenUrl', document.getElementById('imagenEspecialidadMedica').files[0]);

  //envia los datos al backend usando fetch
  // realiza la solicitud https al servidor en la ruta
  fetch('/especialidadesmedicas', {
    method: 'POST',
    body: formData 
  }) // formData es el cuerpo de la solicitud que contiene los datos del formulario

    .then(response => response.json()) // toma la respuesta del servidor y la convierte en un objeto json
    .then(data => { // maneja el obeto json resultante
      alert('Especialidad subida con éxito'); //muestra una alerta
      obtenerEspecialidades(); //llamada a la funcion para obtener las especialidades actualizadas
    })
    .catch(error => console.error('Error:', error)); //captura los errores
});
=======
// script inetermedio entre el  POST de html y las rutas de especialidades medicas para el POST
// Crear Especialidades Medicas Admin
const multer = require('multer'); // requiere multer para manejar la subida de archivos
>>>>>>> Stashed changes



//validacion del formulario id=form-Create-EspMedicas
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('form-Create-EspMedicas');
  
    if (form) { // Aseguramos que el formulario existe antes de agregar el event listener
      form.addEventListener('submit', async function (event) {
        event.preventDefault();
  
        // capturamos los valores de los campos
        const nombreEspMedica = document.getElementById('nombreEspecialidadMedica').value.trim();
        const descripcionMedica = document.getElementById('descripcionMedica').value.trim();
        const imagenUpLoad = document.getElementById('inputImagen');
  
        // Validamos que el nombre de la especialidad médica no esté vacío
        if (!nombreEspMedica) {
          alert("El nombre de la especialidad médica es obligatorio.");
          return;
        }
  
        // Validamos que la descripción no esté vacía
        if (!descripcionMedica) {
          alert("La descripción de la especialidad médica es obligatoria.");
          return;
        }
  
        // Validamos que haya un archivo seleccionado y que sea una imagen válida
        if (!imagenUpLoad.files || imagenUpLoad.files.length === 0) {
          alert("Por favor, sube una imagen.");
          return;
        }
  
        const file = imagenUpLoad.files[0];
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validImageTypes.includes(file.type)) {
          alert("El archivo debe ser una imagen válida (JPEG, PNG, GIF).");
          return;
        }
  
        // Si todo está bien, enviamos los datos al servidor (simulación)
        const formData = new FormData();
        formData.append('nombreEspecialidadMedica', nombreEspMedica);
        formData.append('descripcionMedica', descripcionMedica);
        formData.append('imagen', file);
  
        try {
          const response = await fetch('http://localhost:3000/especialidades/', {
            method: 'POST',
            body: formData,
          });
  
          if (response.ok) {
            alert("Especialidad médica creada con éxito.");
            form.reset();
          } else {
            const errorData = await response.json();
            alert(`Error al crear la especialidad médica: ${errorData.message}`);
          }
        } catch (error) {
          console.error("Hubo un error al enviar los datos:", error);
          alert("Hubo un error inesperado. Por favor, inténtalo de nuevo.");
        }
      });
    }
  });
  
          