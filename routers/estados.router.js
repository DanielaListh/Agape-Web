//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/estados.controller");

//metodo get para todas los roles
router.get('/', controller.obtenerEstados);

// Método GET para una (1) solo genero
router.get('/:parametro', (req, res) => {
    let { parametro } = req.params;

    const id = Number(parametro);

    if (!isNaN(id) && Number.isInteger(id)) {// isNaN = es un no numero, !isNaN = si es un numero
        // Es un ID valido (entero)
        req.params.idEstado = id;
        controller.obtenerEstadoID(req, res);// no se ejecuta
    } else {
        // Es un nombre
        req.params.nombreEstado = parametro.trim();
        controller.obtenerProvinciaNombre(req, res);
    }
});

//metodo post, para crear o actualizar
router.post('/', controller.crearEstado);

//metodo put, busca por id y actualizar
router.put('/:idEstado', controller.actualizarEstado);

//metodo delete
router.delete('/:idEstado', controller.borrarEstado);

//exportar las rutas(routers)
module.exports = router;