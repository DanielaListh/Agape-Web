//rutas del modulo
import express from 'express'; // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

import{
    obtenerGeneros,
    obtenerGeneroID,
    obtenerNombreGenero,
    crearGenero,
    actualizarGenero,
    borrarGenero,
} from '../controllers/generos.controller.js'

//controlador
//const controller = require("../controllers/generos.controller");

//metodo get para todas los generos
router.get('/', obtenerGeneros);

//para un solo genero
//router.get('/:idGenero', controller.obtenerGenero);

//para un genero buscado por nombre
//router.get('/:nombreGenero', controller.obtenerNombreGenero);

// Método GET para una (1) solo genero
router.get('/:parametro', (req, res) => {
    let { parametro } = req.params;

    const id = Number(parametro);

    if (!isNaN(id) && Number.isInteger(id)) {// isNaN = es un no numero, !isNaN = si es un numero
        // Es un ID valido (entero)
        req.params.idGenero = id;
        obtenerGeneroID(req, res);// no se ejecuta
    } else {
        // Es un nombre
        req.params.nombreGenero = parametro.trim();
        obtenerNombreGenero(req, res);
    }
});

//metodo post, para crear o actualizar
router.post('/', crearGenero);

//metodo put, busca por id y actualizar
router.put('/:idGenero', actualizarGenero);

//metodo delete
router.delete('/:idGenero', borrarGenero);

//exportar las rutas(routers)
export default router;
