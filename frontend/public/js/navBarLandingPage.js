// boton desplegable
const btnNavBar = document.getElementById("menuBar");
const listaNavegacion = document.getElementById("listaNavegacion");
    
document.addEventListener("DOMContentLoaded", function (e) {
    e.preventDefault();

    btnNavBar.addEventListener("click", function () {
        listaNavegacion.classList.toggle("show");
    });

    btnNavBar.addEventListener("click", function (event) {
        if (!btnNavBar.contains(event.target) && !listaNavegacion.contains(event.target)) {
            listaNavegacion.classList.remove("show");
        }
    });
})