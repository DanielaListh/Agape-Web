//conexion a base de datos
const mysql = require("mysql2"); // va a requerir 

const connection = mysql.createConnection({ // la constante de la conexion que necesita esos atributos
    host:"localhost",
    user:"root",
    password:"",
    database:"agape_web", 
    port: 3306
}); //el puerto al cual va a estar escuhcando a la base de datos

connection.connect((error) => {
    if(error){
        return console.error(error);
    }
    console.log("estamos conectados a la base de datos correctamente");
});

//export el modulo a la funcion coneccion
module.exports=connection;