// esto es un endpoint

const express = require("express");
const cors = require("cors");
require('dotenv').config(); //luego lo veremos pero son las variables de entorno, \se requiere las variables de entorno ejemplo PORT
const app = express();// para leer JSON
const path = require('path');

app.use(express.json()); // en el cuerpo de la peticion vendra un json y se transforma en un objeto js y asi poder usarlo
//Middleware para transformar el cuerpo de la peticion a Json
app.use(express.urlencoded({ extended: true })); // para datos de formularios


app.use(cors());// Para permitir peticiones desde el frontend

//se utilizan para servir archivos estaticos en una web
//Esto permite que Express sirva correctamente tus archivos CSS, JavaScript e imágenes.
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/imagenes', express.static(path.join(__dirname, 'css','imagenes')));
//servir archivos estaticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//config de archivos estaticos para la carpeta html
app.use(express.static(path.join(__dirname, 'html')));

const caracteristicasClinicasRouter = require('./routers/caracteristicasClinicas.router');
app.use('/caracteristicasClinicas', caracteristicasClinicasRouter);

const especialidadesMedicasRouter = require('./routers/especialidades_medicas.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/especialidades', especialidadesMedicasRouter); // prefijo de la ruta especialidades

const rolesRouter = require('./routers/roles.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/roles', rolesRouter); // prefijo de la ruta roles

const usuariosRouter = require('./routers/usuarios.router'); // que coloque en esta constante lo que hay en ese modulo
app.use('/usuarios', usuariosRouter); // prefijo de la ruta usuarios

const medicosRouter = require('./routers/medicos.router');
app.use('/medicos', medicosRouter); // que la app expres utilice el /medicos como ruta

const medicosEspecialidadesRouter =  require('./routers/medicosEspecialidades.router');
app.use('/medicosEspecialidades', medicosEspecialidadesRouter);

const generoRouter = require('./routers/generos.router');
app.use('/generos', generoRouter);

const estadosRouter = require('./routers/estados.router');
app.use('/estados', estadosRouter);
//const usuariosMiddleware = require('./middleware/usuarios.middleware');



// Ejemplo de ruta específica al home del modulo admin
app.get('/Agape', (req, res) => {
   res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

//ruta para ir a el registro de admin
app.get('/Agape/registerAdmin', (req,res) =>{
   console.log('accediendo al registro');
   res.sendFile(path.join(__dirname, 'html', 'Usuarios', 'registroUsuarios.html'));
})

// servir la pagina html cuando se hace una solicitud
// ruta cuando se quiere loguear un admin
app.get('/Agape/loginAdmin', (req,res) => { 
   console.log('accediendo a /loginAdmin');
   res.sendFile(path.join(__dirname,'html', 'Usuarios', 'loginAdmin.html'));
});

//rutas dentro del modulo admin
//app.get('/Agape/verEspecialidades/', (req, res) => {
   //res.sendFile(path.join(__dirname, 'html', 'verEspecialidadesMedicas.html'));
//});

//app.get('/Agape/crearEspecialidad', (req, res) => {
  // res.sendFile(path.join(__dirname, 'html', 'crearEspecMedica.html'));
//});

// servir la pagina html cuando se hace una solicitud get a /adminHome
app.get('/adminHome', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'html', 'adminHome.html'));
});

//Caracteristicas Clinicas
// servir la pagina html cuando se hace una solicitus get a /adminHome
app.get('/adminHome/verCaracteristicasClinicas', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'html', 'CaracteristicasClinicas' ,'verCaracteristicaClinica.html'));//falta rellenar
});

app.get('/adminHome/crearCaracteristicaClinica', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'html', 'CaracteristicasClinicas', 'crearCaractClinica.html'));
});

app.get('/adminHome/modificarCaracteristicaClinica', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'html', 'CaracteristicasClinicas', 'modificarCaractClinica.html'));//falta rellenar
});

//Especialidades Medicas
// servir la pagina html cuando se hace una solicitus get a /adminHome
app.get('/adminHome/verEspecialidades', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'html', 'EspecialidadesMedicas' ,'verEspecialidadesMedicas.html'));
});

// servir la pagina html cuando se hace una solicitus get a /adminHome
app.get('/adminHome/crearEspecialidad', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'html', 'EspecialidadesMedicas', 'crearEspecMedica.html'));
});

// servir la pagina html cuando se hace una solicitus get a /adminHome
app.get('/adminHome/modificarEspecialidad', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'html', 'EspecialidadesMedicas', 'modificarEspecMedica.html'));
});

// Estados o Provincias
app.get('/adminHome/verProvincias', (req,res) => {
   res.sendFile(path.join(__dirname, 'html', 'Provincias','verProvincias.html'));
});

app.get('/adminHome/crearProvincias', (req,res) => {
   res.sendFile(path.join(__dirname, 'html', 'Provincias', 'crearProvincias.html'));
});

app.get('/adminHome/modificarProvincias', (req,res) => {
   res.sendFile(path.join(__dirname, 'html', 'Provincias', 'modificarProvincia.html'));
});

//Generos
app.get('/adminHome/verGeneros', (req,res) => {
   res.sendFile(path.join(__dirname, 'html', 'Generos', 'verGeneros.html'));
})

app.get('/adminHome/crearGeneros', (req,res) => {
   res.sendFile(path.join(__dirname, 'html', 'Generos', 'crearGeneros.html'));
})

app.get('/adminHome/modificarGenero', (req,res) =>{
   res.sendFile(path.join(__dirname, 'html', 'Generos', 'modificarGenero.html'));
})


const PORT = process.env.PORT || 3000;// que coloque en el puerto lo que este definido en el servidor o por default 3000. env=enviroment
app.listen(PORT,()=> console.log(`http://localhost:${PORT}`)); // le pedimos que escuche el puerto