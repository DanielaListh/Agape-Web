
//core de la app: definís middleware, rutas, todo el comportamiento de Express.
//Define toda la lógica: middlewares, rutas, etc.

// src/index.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
//import { connection } from './db/db.js';
import Swal from 'sweetalert2';

Swal.fire('¡Vite funcionando con SweetAlert2!');

// Routers
import caracteristicasClinicasRouter from './routers/caracteristicasClinicas.router.js';
import especialidadesMedicasRouter from './routers/especialidades_medicas.router.js';
import rolesRouter from './routers/roles.router.js';
import usuariosRouter from './routers/usuarios.router.js';
import medicosRouter from './routers/medicos.router.js';
import medicosEspecialidadesRouter from './routers/medicosEspecialidades.router.js';
import generoRouter from './routers/generos.router.js';
import estadosRouter from './routers/estados.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(express.json()); // en el cuerpo de la peticion vendra un json y se transforma en un objeto js y asi poder usarlo
//Middleware para transformar el cuerpo de la peticion a Json
app.use(express.urlencoded({ extended: true })); // para datos de formularios
app.use(cors());// Para permitir peticiones desde el frontend

app.use(cors({
  origin: 'https://tu-dominio-vercel.vercel.app', // reemplaza por la URL real de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // si usas cookies o autenticación con credenciales
}));


//Archivos estaticos
//se utilizan para servir archivos estaticos en una web
//Esto permite que Express sirva correctamente tus archivos CSS, JavaScript e imágenes.
app.use('/css', express.static(path.join(__dirname, '../../frontend/public/css')));
app.use('/js', express.static(path.join(__dirname, '../../frontend/public/js')));
app.use('/imagenes', express.static(path.join(__dirname, '../../frontend/public/css/imagenes')));
//servir archivos estaticos desde la carpeta 'uploads'
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
//config de archivos estaticos para la carpeta html
app.use(express.static(path.join(__dirname, '../../frontend/public')));


// Routers API
app.use('/caracteristicasClinicas', caracteristicasClinicasRouter);
app.use('/especialidades', especialidadesMedicasRouter); // prefijo de la ruta especialidades
app.use('/roles', rolesRouter); // prefijo de la ruta roles
app.use('/usuarios', usuariosRouter); // prefijo de la ruta usuarios
app.use('/medicos', medicosRouter); // que la app expres utilice el /medicos como ruta
app.use('/medicosEspecialidades', medicosEspecialidadesRouter);
app.use('/generos', generoRouter);
app.use('/estados', estadosRouter);

// vistas HTML (servir las paginas)
// Ejemplo de ruta específica al home del modulo admin
app.get('/Agape', (req, res) => {
   res.sendFile(path.join(__dirname, '../../frontend/index.html'));
});

//ruta para ir a el registro de admin
app.get('/registerAdmin', (req,res) =>{
   //console.log('accediendo al registro');
   res.sendFile(path.join(__dirname, '../../frontend/registroUsuarios.html'));
})

// servir la pagina html cuando se hace una solicitud
// ruta cuando se quiere loguear un admin
app.get('/loginAdmin', (req,res) => { 
   //console.log('accediendo a /loginAdmin');
   res.sendFile(path.join(__dirname,'../../frontend/loginAdmin.html'));
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
   res.sendFile(path.join(__dirname, '../../frontend/public/html/adminHome.html'));
});

//app.get('/adminHome/MiPerfil', (req,res) => {
  // res.sendFile(path.join(__dirname, '../public/html/Usuarios/perfilAdmin.html'));
//})

app.get('/adminHome/verUsuarios', (req,res) =>{
   res.sendFile(path.join(__dirname, '../../frontend/public/html/Usuarios/verUsuarios.html'));
})

//Caracteristicas Clinicas
// servir la pagina html cuando se hace una solicitus get a /adminHome
app.get('/adminHome/verCaracteristicasClinicas', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname, '../../frontend/public/html/CaracteristicasClinicas/verCaracteristicaClinica.html'));//falta rellenar
});

app.get('/adminHome/crearCaracteristicaClinica', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'../../frontend/public/html/CaracteristicasClinicas/crearCaractClinica.html'));
});

app.get('/adminHome/modificarCaracteristicaClinica', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'../../frontend/public/html/CaracteristicasClinicas/modificarCaractClinica.html'));//falta rellenar
});

//Especialidades Medicas
// servir la pagina html cuando se hace una solicitus get a /adminHome
app.get('/adminHome/verEspecialidades', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'../../frontend/public/html/EspecialidadesMedicas/verEspecialidadesMedicas.html'));
});

// servir la pagina html cuando se hace una solicitus get a /adminHome
app.get('/adminHome/crearEspecialidad', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'../../frontend/public/html/EspecialidadesMedicas/crearEspecMedica.html'));
});

// servir la pagina html cuando se hace una solicitus get a /adminHome
app.get('/adminHome/modificarEspecialidad', (req,res) => { // la ruta raiz del proyecto o pag principal del sitio
   res.sendFile(path.join(__dirname,'../../frontend/public/html/EspecialidadesMedicas/modificarEspecMedica.html'));
});

// Estados o Provincias
app.get('/adminHome/verProvincias', (req,res) => {
   res.sendFile(path.join(__dirname, '../../frontend/public/html/Provincias/verProvincias.html'));
});

app.get('/adminHome/crearProvincias', (req,res) => {
   res.sendFile(path.join(__dirname, '../../frontend/public/html/Provincias/crearProvincias.html'));
});

app.get('/adminHome/modificarProvincias', (req,res) => {
   res.sendFile(path.join(__dirname, '../../frontend/public/html/Provincias/modificarProvincia.html'));
});

//Generos
app.get('/adminHome/verGeneros', (req,res) => {
   res.sendFile(path.join(__dirname, '../../frontend/public/html/Generos/verGeneros.html'));
});

app.get('/adminHome/crearGeneros', (req,res) => {
   res.sendFile(path.join(__dirname, '../../frontend/public/html/Generos/crearGeneros.html'));
});

app.get('/adminHome/modificarGenero', (req,res) =>{
   res.sendFile(path.join(__dirname, '../../frontend/public/html/Generos/modificarGenero.html'));
});


export default app;