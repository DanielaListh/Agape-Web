document.addEventListener("DOMContentLoaded", function () {
    const btnNavBar = document.getElementById("menuBar");
    const listaNavegacion = document.getElementById("listaNavegacion");

    btnNavBar.addEventListener("click", function () {
        listaNavegacion.classList.toggle("show");
    });
    

    document.addEventListener("click", function (event) {
        if (
        !btnNavBar.contains(event.target) &&
        !listaNavegacion.contains(event.target)
        ) {
        listaNavegacion.classList.remove("show");
        }
    });
    
});