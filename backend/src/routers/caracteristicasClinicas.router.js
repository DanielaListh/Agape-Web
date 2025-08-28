// rutas del modulo con ES MODULES  
import express from 'express'; // trae el módulo de express
import multer from 'multer'; // requiere multer para manejar la subida de archivos
import path from  'path';
import { fileURLToPath } from 'url';

//import controladores
import{
    caracteristicasClinica,
    caracteristicaClinicaId,
    CaracteristicaClinicaNombre,
    crearCaracteristicaClinica,
    modificarCaracteristica,
    borrarCaracteristica,
} from '../controllers/caracteristicasClinicas.controller.js';

const router = express.Router();

// Obtener __dirname (porque no existe directamente en ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura multer para aceptar solo archivos de imagen
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(path.join(__dirname, '../../uploads'));//test
        cb(null, path.join(__dirname, '../../uploads'));//guarda el archivo en la carpeta
    },
    filename: (req, file, cb) => {
        const safeName = file.fieldname + '-' + Date.now() + path.extname(file.originalname); // le da un nombre seguro
        cb(null, safeName);
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
//const controller = require("../controllers/caracteristicasClinicas.controller");

//RUTAS

// Método GET para todas las caracteristicas
router.get('/', caracteristicasClinica);

// Método GET para una (1) sola caracteristica
router.get('/:parametro', (req, res) => {
    let { parametro } = req.params;

    const id = Number(parametro);

    if (!isNaN(id) && Number.isInteger(id)) {// isNaN = es un no numero, !isNaN = si es un numero
        // Es un ID valido (entero)
        req.params.idCaracteristicaClinica = id;
        caracteristicaClinicaId(req, res);// probar coo ejempo de testing
    } else {
        // Es un nombre
        req.params.nombrecaracterClinica = parametro.trim();
        CaracteristicaClinicaNombre(req, res);
    }
});


// Método POST para crear
//ejemplo: router.post('/', upload, controller.crearEspecialidad);
/*
router.post('/', (req, res, next) => {
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      next();
    });
    console.log("llego al controlador");
}, crearCaracteristicaClinica);
*/

router.post('/', upload, crearCaracteristicaClinica);
  

// Método PUT para buscar por nombre y actualizar
router.put('/:idCaracteristicaClinica', upload, modificarCaracteristica);

// Método DELETE para borrar una caracteristica
router.delete('/:idCaracteristicaClinica', borrarCaracteristica);

// Exportar las rutas (routers)
//module.exports = router;

//exportar modulo ES
export default router;