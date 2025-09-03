import { cerrarSession } from '../public/js/usuarios/cerrarSesion';

document.addEventListener("DOMContentLoaded", function () {
    const logout = document.getElementById("logout");

    if (!logout) {
        console.log("no se encontro el objeto logout");
        return;
    }

    logout.addEventListener("click", (event) => {
        event.preventDefault();
        cerrarSession();
    }); 
});