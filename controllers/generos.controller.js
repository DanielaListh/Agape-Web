//// controladores del modulo
const { error } = require('console');
const db = require('../db/db');

// Método GET para obtener todos los géneros
const obtenerGeneros = (req, res) => {
    const sql = "SELECT * FROM generos";
    db.query(sql, (error, rows) => {
        if (error) {
            console.error("Error al obtener los géneros:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        res.json(rows);
    });
};

// Controlador para obtener un género específico por ID
const obtenerGeneroID = (req, res) => {
    let { idGenero } = req.params;
    idGenero = Number(idGenero); //pasa la variable a Int

    //validar si es un numero y mandar la consulta buscando por id
    if(!Number.isInteger(idGenero) || idGenero <= 0){
        return res.status(400).json({error: "El ID ingresado debe ser un numero existente en la base de datos"});
    }

    const sqlInt = "SELECT * FROM generos WHERE id_genero = ?";
    db.query(sqlInt, [idGenero], (error, rows) => {
        if (error) {
            console.error("Error al obtener el género:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (rows.length == 0) {
            return res.status(404).send({ error: "Error: No existe el género buscado" });
        }
        res.json(rows);
    });
};

// Get para una (1) Genero por nombre
const obtenerNombreGenero = (req, res) => {
    let { nombreGenero } = req.params;

    console.log("prueba de genero 1", nombreGenero);

    // Validación: debe ser un string y no puede ser un número ni exceder 50 caracteres
    if (!nombreGenero) {
        return res.status(400).json({
            error: "Error: el input no debe estar vacio."
        });
    } 

    nombreGenero = nombreGenero.trim();// quitamos los espacios vacios
    console.log("prueba de genero 2", nombreGenero);

    // Validación: debe contener solo letras y no exceder 15 caracteres
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{1,15}$/;
    if (!regex.test(nombreGenero)) {
        return res.status(400).json({
            error: "Error: El nombre de genero debe contener solo letras y tener un máximo de 15 caracteres."
        });
    }

    const sql = "SELECT * FROM generos WHERE nombre_genero LIKE ?"; //sentencia que permite buscar por coincidencias de caracteres
    db.query(sql, [`%${nombreGenero}%`], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (rows.length == 0) {
            return res.status(404).json({ error: "Error: No existe el genero buscado" });
        }
        //res.json(rows[0]);// antes al utilizar [0] solo nos traia el primer registro que coincidia
        res.json(rows); // nos muestra todos los registros que coinciden con la busqueda
    });
};




// Método POST para crear un nuevo género
const crearGenero = (req, res) => {
    console.log("Body recibido:", req.body);
    const { nombreGenero } = req.body;

    const sql = "INSERT INTO generos (nombre_genero) VALUES (?)";
    db.query(sql, [nombreGenero], (error, result) => {
        if (error) {
            console.error("Error al crear el género:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        //const generoCreado = { ...req.body, id: result.insertId };
        res.status(201).json({mensaje: "genero creado con exito"});
    });
};

// Método PUT para actualizar un género existente
const actualizarGenero = (req, res) => {
    const { idGenero } = req.params;
    const { nombreGenero } = req.body;
    const sql = "UPDATE generos SET nombre_genero = ? WHERE id_genero = ?";
    db.query(sql, [nombreGenero, idGenero], (error, result) => {
        if (error) {
            console.error("Error al actualizar el género:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: El género a modificar no existe" });
        }
        const generoActualizado = { ...req.body, ...req.params };
        res.json(generoActualizado);
    });
};

// Método DELETE para eliminar un género
const borrarGenero = (req, res) => {
    const { idGenero } = req.params;
    const sql = "DELETE FROM generos WHERE id_genero = ?";
    db.query(sql, [idGenero], (error, result) => {
        if (error) {
            console.error("Error al eliminar el género:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: El género a eliminar no existe" });
        }
        res.json({ mensaje: "Género eliminado correctamente" });
    });
};

// Exportar las funciones del módulo
module.exports = {
    obtenerGeneros,
    obtenerGeneroID,
    obtenerNombreGenero,
    crearGenero,
    actualizarGenero,
    borrarGenero,
};
