import { connection } from '../db/db.js';

// GET todos los estados
const obtenerEstados = async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM estados");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// GET estado por ID
const obtenerEstadoID = async (req, res) => {
    let { idEstado } = req.params;
    idEstado = Number(idEstado);

    if (!Number.isInteger(idEstado) || idEstado <= 0) {
        return res.status(400).json({ error: "El ID ingresado debe ser un número válido" });
    }

    try {
        const [rows] = await connection.query(
            "SELECT * FROM estados WHERE id_estado = ?",
            [idEstado]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Error: No existe la provincia buscada" });
        }
        res.json(rows);
    } catch (error) {
        console.error("Error al obtener la provincia:", error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// GET provincia por nombre
const obtenerProvinciaNombre = async (req, res) => {
    let { nombreEstado } = req.params;

    if (!nombreEstado) {
        return res.status(400).json({ error: "Error: El parámetro debe ser un texto válido." });
    }

    nombreEstado = nombreEstado.trim();
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{1,20}$/;

    if (!regex.test(nombreEstado)) {
        return res.status(400).json({
            error: "Error: El nombre debe contener solo letras y tener un máximo de 20 caracteres."
        });
    }

    try {
        const [rows] = await connection.query(
            "SELECT * FROM estados WHERE nombre_estado LIKE ?",
            [`%${nombreEstado}%`]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Error: No existe la provincia buscada" });
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// POST crear estado
const crearEstado = async (req, res) => {
    const { nombreEstado } = req.body;

    try {
        const [result] = await connection.query(
            "INSERT INTO estados (nombre_estado) VALUES (?)",
            [nombreEstado]
        );
        res.status(201).json({ mensaje: "Provincia creada con éxito" });
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// PUT actualizar estado
const actualizarEstado = async (req, res) => {
    const { idEstado } = req.params;
    const { nombreEstado } = req.body;

    try {
        const [result] = await connection.query(
            "UPDATE estados SET nombre_estado = ? WHERE id_estado = ?",
            [nombreEstado, idEstado]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Error: el estado a modificar no existe" });
        }
        const estadoActualizado = { ...req.body, ...req.params };
        res.json(estadoActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// DELETE borrar estado
const borrarEstado = async (req, res) => {
    const { idEstado } = req.params;

    try {
        const [result] = await connection.query(
            "DELETE FROM estados WHERE id_estado = ?",
            [idEstado]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Error: el estado a eliminar no existe" });
        }
        res.json({ mensaje: "Estado eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// Exportar funciones
export {
    obtenerEstados,
    obtenerEstadoID,
    obtenerProvinciaNombre,
    crearEstado,
    actualizarEstado,
    borrarEstado,
};
