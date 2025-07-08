//rutas del modulo
import express from 'express'; // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

import {
    obtenerMedicos,
    obtenerMedico,
    //crearDatosMedico,
    actualizarDatosMedico,
    borrarDatosMedico,
} from '../controllers/medicos.controller.js';

//controlador
//const controller = require("../controllers/medicos.controller");

//metodo get para todas los medicos
router.get('/', obtenerMedicos);

//para un solo medico
router.get('/:id_usuario', obtenerMedico);

// he decidido que no tiene sentido crear los datos del medico ya que estos se crean con valor default al registarse un usuario con el rol 2
//metodo post, para crear o actualizar
//router.post('/', controller.crearDatosMedico);

//metodo put, busca por id y actualizar
router.put('/:id_usuario', actualizarDatosMedico);

//metodo delete
router.delete('/:id_usuario', borrarDatosMedico);

export default router;
