//en el presente script se crearan las funciones que llamaran a las rutas dentro de la navegacion del modulo admin

//AdminHome autoredireccion -> al hacer click en Home
function irHome(){
    window.location.href= 'http://localhost:3000/adminHome/';
}

//ESPECIALIDADES MEDICAS
function verEspecialidades(){
    window.location.href='http://localhost:3000/adminHome/verEspecialidades/';
}

function crearEspecialidad(){
    window.location.href='http://localhost:3000/adminHome/crearEspecialidad/';
}

function modificarEspecialidad(){
    window.location.href = 'http://localhost:3000/adminHome/modificarEspecialidad/';
}

// USUARIOS
function verUsuarios(){
    window.location.href='http://localhost:3000/adminHome/verUsuarios/';
}

function modificarUsuario(){
    window.location.href = 'http://localhost:3000/adminHome/modificarUsuario/';
}


// Provincias
function verProvincias(){
    window.location.href='http://localhost:3000/adminHome/verProvincias/';
}
