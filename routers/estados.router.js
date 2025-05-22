//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/estados.controller");

//metodo get para todas los roles
router.get('/', controller.obtenerEstados);

//Gpara un solo rol
router.get('/:idEstado', controller.obtenerEstado);

// Método GET para una (1) sola especialidad POR NOMBRE
router.get('/:nombreEstado', controller.provinciaNombre);////////////////////////

//metodo post, para crear o actualizar
router.post('/', controller.crearEstado);

//metodo put, busca por id y actualizar
router.put('/:idEstado', controller.actualizarEstado);

//metodo delete
router.delete('/:idEstado', controller.borrarEstado);

//exportar las rutas(routers)
module.exports = router;