import { connection } from '../db/db.js';

// GET todos los géneros
const obtenerGeneros = async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM generos");
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener los géneros:", error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// GET género por ID
const obtenerGeneroID = async (req, res) => {
    let { idGenero } = req.params;
    idGenero = Number(idGenero);

    if (!Number.isInteger(idGenero) || idGenero <= 0) {
        return res.status(400).json({ error: "El ID ingresado debe ser un número válido" });
    }

    try {
        const [rows] = await connection.query(
            "SELECT * FROM generos WHERE id_genero = ?",
            [idGenero]
        );
        if (rows.length === 0) {
            return res.status(404).send({ error: "Error: No existe el género buscado" });
        }
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener el género:", error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// GET género por nombre
const obtenerNombreGenero = async (req, res) => {
    let { nombreGenero } = req.params;

    if (!nombreGenero) {
        return res.status(400).json({ error: "Error: el input no debe estar vacío." });
    }

    nombreGenero = nombreGenero.trim();
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{1,15}$/;

    if (!regex.test(nombreGenero)) {
        return res.status(400).json({
            error: "Error: El nombre de género debe contener solo letras y tener un máximo de 15 caracteres."
        });
    }

    try {
        const [rows] = await connection.query(
            "SELECT * FROM generos WHERE nombre_genero LIKE ?",
            [`%${nombreGenero}%`]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Error: No existe el género buscado" });
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// POST crear género
const crearGenero = async (req, res) => {
    const { nombreGenero } = req.body;

    try {
        const [result] = await connection.query(
            "INSERT INTO generos (nombre_genero) VALUES (?)",
            [nombreGenero]
        );
        res.status(201).json({ mensaje: "Género creado con éxito" });
    } catch (error) {
        console.error("Error al crear el género:", error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// PUT actualizar género
const actualizarGenero = async (req, res) => {
    const { idGenero } = req.params;
    const { nombreGenero } = req.body;

    try {
        const [result] = await connection.query(
            "UPDATE generos SET nombre_genero = ? WHERE id_genero = ?",
            [nombreGenero, idGenero]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: El género a modificar no existe" });
        }
        const generoActualizado = { ...req.body, ...req.params };
        res.json(generoActualizado);
    } catch (error) {
        console.error("Error al actualizar el género:", error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// DELETE borrar género
const borrarGenero = async (req, res) => {
    const { idGenero } = req.params;

    try {
        const [result] = await connection.query(
            "DELETE FROM generos WHERE id_genero = ?",
            [idGenero]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: El género a eliminar no existe" });
        }
        res.json({ mensaje: "Género eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el género:", error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// Exportar funciones
export {
    obtenerGeneros,
    obtenerGeneroID,
    obtenerNombreGenero,
    crearGenero,
    actualizarGenero,
    borrarGenero,
};

