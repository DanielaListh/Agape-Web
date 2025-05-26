//rutas del modulo
const express = require('express'); // traiga el modulo de expres
const router = express.Router(); // que use la funcion de rutas

//controlador
const controller = require("../controllers/generos.controller");

//metodo get para todas los generos
router.get('/', controller.obtenerGeneros);

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
        controller.obtenerGeneroID(req, res);// no se ejecuta
    } else {
        // Es un nombre
        req.params.nombreGenero = parametro.trim();
        controller.obtenerNombreGenero(req, res);
    }
});

//metodo post, para crear o actualizar
router.post('/', controller.crearGenero);

//metodo put, busca por id y actualizar
router.put('/:idGenero', controller.actualizarGenero);

//metodo delete
router.delete('/:idGenero', controller.borrarGenero);

//exportar las rutas(routers)
module.exports = router;
