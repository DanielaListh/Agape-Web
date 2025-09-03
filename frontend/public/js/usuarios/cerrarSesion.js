document.addEventListener("DOMContentLoaded", function () {
    const logout = document.getElementById("logout");

    if (!logout) {
        console.log("no se obtuvo el id de logout");
        return;
    }
    logout.addEventListener("click", function (event) {
        event.preventDefault();
        cerrarSession();
    });
})

function cerrarSession() {
    //que hace la funcion?
    //verifica que al hacer clic en el boton traido por logout avise que se va a cerrar sesion
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    alert("Session cerrada");
    window.location.href = "/Agape/loginAdmin";    
}

//el metodo ya esta siendo llamado desde el script del admin
//veremos mas adelante de que manera es mejor colocarlo, si un llamado al boton desde este sript
// o si es mejor desde el html
//document.getElementById("logoutButton").addEventListener("click", cerrarSesion);
