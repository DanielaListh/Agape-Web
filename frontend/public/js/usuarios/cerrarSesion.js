import Swal from "sweetalert2";

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("logout").addEventListener("click", cerrarSession);
});

function cerrarSession(){
    
    Swal.fire({
            title:'¿Desea cerrar la sesión?',
            text:'Esta acción cerrará su sesión actual',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText:'Cerrar sesion',
            cancelButtonText: 'Cancelar'
    }).then((result) =>{
        if(result.isConfirmed){
            localStorage.removeItem("token");
            localStorage.removeItem("userRole");

            Swal.fire({
                title: 'Sesion cerrada',
                timer: 1500,
                icon: 'success',
                showConfirmButton: false
            }).then(()=>{
                window.location.href = 'http://localhost:3000/Agape/loginAdmin/';
            });
        } else {
            Swal.fire({
                title: 'sesion activa',
                text: '',
                icon: 'info',
                confirmButtonText: 'OK'
            });
        }
    });
}

//el metodo ya esta siendo llamado desde el script del admin
//veremos mas adelante de que manera es mejor colocarlo, si un llamado al boton desde este sript
// o si es mejor desde el html
//document.getElementById("logoutButton").addEventListener("click", cerrarSesion);
