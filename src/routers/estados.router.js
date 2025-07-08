
// rutas del modulo con ES MODULES  
import express from 'express'; // trae el módulo de express


import {
    obtenerEstados,
    obtenerEstadoID,
    obtenerProvinciaNombre,
    crearEstado,
    actualizarEstado,
    borrarEstado,
} from '../controllers/estados.controller.js';

const router = express.Router();

//controlador
//const controller = require("../controllers/estados.controller");

//metodo get para todas los roles
router.get('/', obtenerEstados);

// Método GET para una (1) solo genero
router.get('/:parametro', (req, res) => {
    let { parametro } = req.params;

    const id = Number(parametro);

    if (!isNaN(id) && Number.isInteger(id)) {// isNaN = es un no numero, !isNaN = si es un numero
        // Es un ID valido (entero)
        req.params.idEstado = id;
        obtenerEstadoID(req, res);// no se ejecuta
    } else {
        // Es un nombre
        req.params.nombreEstado = parametro.trim();
        obtenerProvinciaNombre(req, res);
    }
});

//metodo post, para crear o actualizar
router.post('/', crearEstado);

//metodo put, busca por id y actualizar
router.put('/:idEstado', actualizarEstado);

//metodo delete
router.delete('/:idEstado', borrarEstado);

export default router;