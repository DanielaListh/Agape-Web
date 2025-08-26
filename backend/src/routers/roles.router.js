//rutas del modulo
import express from 'express'; // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

import {
    obtenerRoles,
    obtenerRol,
    crearRol,
    actualizarRol,
    borrarRol,
} from '../controllers/roles.controller.js';

//controlador
//const controller = require("../controllers/roles.controller");

//metodo get para todas los roles
router.get('/', obtenerRoles);

//para un solo rol
router.get('/:id_rol', obtenerRol);

//metodo post, para crear o actualizar
router.post('/', crearRol);

//metodo put, busca por id y actualizar
router.put('/:id_rol', actualizarRol);

//metodo delete
router.delete('/:id_rol', borrarRol);

//exportar las rutas(routers)
export default router;