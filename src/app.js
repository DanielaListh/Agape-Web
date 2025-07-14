
//Importa index.js y escucha en el puerto, puerta de entrada
import dotenv from 'dotenv';
dotenv.config();


import app from './index.js';
import express from 'express';
import {connection} from './db/db.js'; // con abreviado de conexion a bbdd

import {PORT} from './config.js';
import bodyParser from "body-parser";
import cors from "cors";
import formContacto from "./routers/formContacto.js"





//require('dotenv').config(); //luego lo veremos pero son las variables de entorno, \se requiere las variables de entorno ejemplo PORT

//const app = express();// para leer json, ya esta definida en index.js
app.use(express.json()); //permite leer json del body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send("Servidor Ágape corriendo correctamente");
})

app.use("/contactos", formContacto);// provando ruta de formulario contacto

//app.get('/ping', async (req,res) => {
  //  try{
    //const [rows] = await connection.query(`SELECT "hello word" AS RESULT`);
    //console.log(rows);
    //res.json(rows[0]);//cliente
    //}catch(error){
    //    console.log("hubo un error al conectar a la base de datos: ", error);
     //   res.status(500).json({error: 'error en la base de datos'});
    //}
//})
   
// le pedimos que escuche el puerto
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
}); 