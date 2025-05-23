//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // usa la funcion de rutas
const controller = require("../controllers/usuarios.controller"); // trae el modulo de controller usuarios
const usuariosMiddleware = require("../middleware/usuarios.middleware");
const multer = require('multer'); // requiere multer para manejar la subida de archivos
const path = require('path');

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
router.post('/register', upload, controller.crearUsuario);// el profe lo nombro como register

//ruta para iniciar sesion !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.post('/login', controller.loginUsuario);

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
router.get('/', controller.obtenerUsuarios);

// ruta para ver info de un solo usuario
router.get('/:idUsuario', controller.obtenerUsuario);

//metodo put, busca por id y actualizar
router.put('/:idUsuario', upload, controller.actualizarUsuario);

//metodo delete
router.delete('/:idUsuario', controller.eliminarUsuario);


//exportar las rutas(routers)
module.exports = router;