// rutas del modulo
const express = require('express'); // trae el módulo de express
const router = express.Router(); // usa la función de rutas
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
}).single('imagenUrl');

// Controlador
const controller = require("../controllers/especialidades_medicas.controller");

// Método GET para todas las especialidades
router.get('/', controller.especialidadesMedicas);

// Método GET para una (1) sola especialidad
router.get('/:parametro', (req, res) => {
    let { parametro } = req.params;

    const id = Number(parametro);

    if (!isNaN(id) && Number.isInteger(id)) {// isNaN = es un no numero, !isNaN = si es un numero
        // Es un ID valido (entero)
        req.params.idEspecialidad = id;
        controller.especialidadMedicaId(req, res);// no se ejecuta
    } else {
        // Es un nombre
        req.params.nombreEspecialidadMedica = parametro.trim();
        controller.especialidadMedicaNombre(req, res);
    }
});


// Método POST para crear
//router.post('/', upload, controller.crearEspecialidad);
router.post('/', (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  }, controller.crearEspecialidad);
  

// Método PUT para buscar por nombre y actualizar
router.put('/:idEspecialidad', upload, controller.modificarEspecialidad);

// Método DELETE para borrar una especialidad
router.delete('/:idEspecialidad', controller.borrarEspecialidad);

// Exportar las rutas (routers)
module.exports = router;

