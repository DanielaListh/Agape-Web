//en el presente script se crearan las funciones que llamaran a las rutas dentro de la navegacion del modulo admin

//AdminHome autoredireccion -> al hacer click en Home
function irHome(){
    window.location.href= 'http://localhost:3000/adminHome/';
}

function irPerfil(){
    window.location.href = 'http://localhost:3000/adminHome/MiPerfil';
}

function verUsuarios(){
    window.location.href = 'http://localhost:3000/adminHome/verUsuarios';
}

//CARACTERISTICAS CLINICAS
function verCaracteristicasClinicas(){
    window.location.href = 'http://localhost:3000/adminHome/verCaracteristicasClinicas';
}

function crearCaracteristicaClinicas(){
    window.location.href = 'http://localhost:3000/adminHome/crearCaracteristicaClinica';
}

function modificarCaracteristicaClinicas(){
    window.location.href = 'http://localhost:3000/adminHome/modificarCaracteristicaClinica';
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
    window.location.href = 'http://localhost:3000/adminHome/verProvincias/';
}

function crearProvincias(){
    window.location.href = 'http://localhost:3000/adminHome/crearProvincias/';
}

function modificarProvincias(){
    window.location.href = 'http://localhost:3000/adminHome/modificarProvincias/';
}

// Generos
function verGeneros(){
    window.location.href = 'http://localhost:3000/adminHome/verGeneros/';
}

function crearGeneros(){
    window.location.href = 'http://localhost:3000/adminHome/crearGeneros/';
}

function modificarGenero(){
    window.location.href = 'http://localhost:3000/adminHome/modificarGenero/';
}
