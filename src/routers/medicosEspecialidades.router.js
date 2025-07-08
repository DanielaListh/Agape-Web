//rutas del modulo
import express from 'express'; // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

import {
    renderizarFormularioEspecialidades,
    obtenerMedicosEspecialidades,
    obtenerMedicosEspecialidad,
    agregarMedicoEspecialidad,
    actualizarMedicoEspecialidad,
    borrarMedicoEspecialidad
} from '../controllers/medicosEspecialidades.controller.js';

//controlador
//const controller = require("../controllers/medicosEspecialidades.controller");

// ruta para mostrar el formulario de especialidades a los medicos, este formulario es de htlm
router.get('/formulario-especialidades', renderizarFormularioEspecialidades);

//metodo get para todas los medicos
router.get('/', obtenerMedicosEspecialidades);

//para un solo medico
router.get('/:idMedicoEspecialidad', obtenerMedicosEspecialidad);

//metodo post, para crear o actualizar
router.post('/', agregarMedicoEspecialidad);

//metodo put, busca por id y actualizar
router.put('/:idMedicoEspecialidad', actualizarMedicoEspecialidad);

//metodo delete
router.delete('/:idMedicoEspecialidad', borrarMedicoEspecialidad);

//exportar las rutas(routers)
export default router;
