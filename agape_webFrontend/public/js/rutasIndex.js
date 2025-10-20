//este scritp pretende contener las funciones que manejan las rutas del index
//en las cuales no necesitan auth ya que son del manejo del index
// osea que no es necesario que un usuario se loguee

function irLoginAdmin(){
    window.location.href = '/Agape/loginAdmin'; // Redirigir al login
}

function irRegistroAdmin(){
    window.location.href = '/Agape/registerAdmin'; // Redirigir al registrp
}
