//rutas del modulo

import usuariosMiddleware from '../middleware/usuarios.middleware.js';
import express from 'express'; // trae el módulo de express
import multer from 'multer'; // requiere multer para manejar la subida de archivos
import path from  'path';
import { fileURLToPath } from 'url';

import{
     crearUsuario,
    loginUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    //obtenerPerfilUsuario,
    actualizarUsuario,
    eliminarUsuario,
} from '../controllers/usuarios.controller.js';

const router = express.Router(); // usa la funcion de rutas


// Configura multer para aceptar solo archivos de imagen
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Solo se permiten archivos de imagen');
    }
};

const upload = multer({ // definimos que siempre subiremos una sola imagen traida de imagenUrl y guardada en upload
    storage: storage,
    fileFilter: fileFilter
}).single('imagenUrl');// tener cuidado de siempre colocar las comillas ''


//ruta para crear un nuevo usuario
router.post('/register', upload, crearUsuario);// el profe lo nombro como register

//ruta para iniciar sesion !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post('/login', loginUsuario);

//ruta protejida de ejemplos 1  
router.get("/protected", usuariosMiddleware, (req, res) => {
    res.sendFile(__dirname + 'adminHome.html');// envia el archivo
    res.status(200).send(`Hola Usuario ${req.userName}`); //es la respuesta sin errores del middleware, ya que en este script vemos solo los error
    
});

// Endpoint protegido hacia el home del admin
//app.get('/adminHome', usuariosMiddleware, (req, res) => {
   // res.sendFile(__dirname + '/adminHome.html'); // Envía el archivo HTML
    //res.status(200).send(`Hola Usuario ${req.userName}`); //es la respuesta sin errores del middleware, ya que en este script vemos solo los error

//});




//ruta para encontrar los usuarios registrados
router.get('/', obtenerUsuarios);

// ruta para ver info de un solo usuario
router.get('/:idUsuario', obtenerUsuario);

//metodo put, busca por id y actualizar
router.put('/:idUsuario', upload, actualizarUsuario);

//metodo delete
router.delete('/:idUsuario', eliminarUsuario);


//exportar las rutas(routers)
export default router;