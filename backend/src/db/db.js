//conexion a base de datos
import {createPool} from 'mysql2/promise';
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from '../config.js';
//const mysql = require("mysql2"); // va a requerir cuando se usa require

//usar una function en cretaeConection para usar asyn y await, ya que e suna promesa.

export const connection = createPool({ // la constante de la conexion que necesita esos atributos
    host: DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME, 
    port: DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}); //el puerto al cual va a estar escuhcando a la base de datos


//El método correcto para testear la conexión en un pool es getConnection(), 
// luego liberar con .release().

//test de conexion
try{
    const conn = await connection.getConnection();//intenta tener la conexion
    console.log("conectado correctamente a la base de datos");
    conn.release(); //libera la conexion a pool
} catch (error){
    console.error("error al conectar la base de datos", error);
}


//connection.connect((error) => {
    //if(error){
    //    return console.error(error);
    //}
   // console.log("estamos conectados a la base de datos correctamente");
//});

//export el modulo a la funcion coneccion
//module.exports=connection;