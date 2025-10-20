//este script se encarga del funcinamiento del menu responsivo de la web

//1. el evento se inicia cuando se hace click en el menuBar
document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();

    //2. obtener los elementos que utilizaremos del html
    const listaNavegacion = document.getElementById('listaNavegacion'); // este es el ul
    const iconX = document.getElementById('iconX');// es el icono de "X" que cerrara el menu
    const menuBar = document.getElementById('menuBar'); // es el icono de tres barras o menu hamburgesa
    const menuCheckbox = document.getElementById('menu'); //
 
    if (!listaNavegacion || !iconX || !menuBar || !menuCheckbox) {
        console.log("no se encontro el item en el html");
        return;
    }

    document.addEventListener("click", function() {
        
    
    });

});















