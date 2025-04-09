//script para validar el usuario al registrarse

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";


//#form-registro
//document.addEventListener("DOMContentLoaded", function () {


document.querySelector('form-registro').addEventListener('submit', function(event) {
    event.preventDefault();
 //nombreUsuario, correoElectronico, password, fechaNacimiento, idGenero, idRol, imagenUrl, const en el backend
    const nombreUsuario = document.getElementById('nombreUsuario');
    const correoElectronico = document.getElementById('correoElectronico');
    const password = document.getElementById('password');
    const fechaNacimiento = document.getElementById('fechaNacimiento');
    const idRol = document.getElementById('idRol');
    const idGenero = document.getElementById('idGenero');
    const imagenUrl = document.getElementById('imagenPerfil');
    const  alertaError = document.getElementById('error-msg');

    

    function validacionNombreUsuario(){
        let errorMsg = false;
        const regex = 'a-zA-z';

        if(!nombreUsuario){
            errorMsg = true;
            alertaError.textContent = "El campo Nombre no puede estar vacio";
            setTimeout( () => alertaError.textContent = "", 5000);
        }else{
            return;
        }

        if(nombreUsuario.value.length <6 || nombreUsuario.value.length >30 ){
            errorMsg = true;
            alertaError.textContent = "El nombre de usuario debe tener al menos 6 letras";
            setTimeout( () => alertaError.textContent = "", 5000);
        } else{
            return;
        }

        
    }
    

    if(!correoElectronico){

    //|| !password || !fechaNacimiento || !idRol || !idGenero || !imagenUrl
    }


    
    const file = imagenUrl.files[0];
    if (file) {
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            alert('Solo se permiten archivos de tipo PNG o JPG.');
        }
        return;
    }



});