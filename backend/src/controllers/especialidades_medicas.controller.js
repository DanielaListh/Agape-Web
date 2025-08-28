import multer from 'multer';
import { connection } from '../db/db.js';

// Get todas las especialidades
const especialidadesMedicas = async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM especialidades_medicas");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// Get por ID
const especialidadMedicaId = async (req, res) => {
    let { idEspecialidad } = req.params;
    idEspecialidad = Number(idEspecialidad);

    if (!Number.isInteger(idEspecialidad) || idEspecialidad <= 0) {
        return res.status(400).json({ error: "El ID ingresado debe ser un número existente en la base de datos" });
    }

    try {
        const [rows] = await connection.query(
            "SELECT * FROM especialidades_medicas WHERE id_especialidad_medica = ?",
            [idEspecialidad]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Error: No existe la especialidad buscada por id" });
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// Get por nombre
const especialidadMedicaNombre = async (req, res) => {
    let { nombreEspecialidadMedica } = req.params;

    if (!nombreEspecialidadMedica) {
        return res.status(400).json({ error: "Error: El parámetro debe ser un texto válido." });
    }

    nombreEspecialidadMedica = nombreEspecialidadMedica.trim();
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{1,50}$/;

    if (!regex.test(nombreEspecialidadMedica)) {
        return res.status(400).json({
            error: "Error: El nombre de la especialidad debe contener solo letras y tener un máximo de 50 caracteres."
        });
    }

    try {
        const [rows] = await connection.query(
            "SELECT * FROM especialidades_medicas WHERE nombre_especialidad_med LIKE CONCAT(?, '%')",
            [`${nombreEspecialidadMedica}%`]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Error: No existe la especialidad buscada" });
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// POST crear
const crearEspecialidad = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    const imagenUrl = `/uploads/${req.file.filename}`;
    const { nombreEspecialidadMedica, descripcionMed } = req.body;

    try {
        const [result] = await connection.query(
            "INSERT INTO especialidades_medicas (nombre_especialidad_med, descripcion_especialidad_med, imagen_especialidad_med) VALUES (?, ?, ?)",
            [nombreEspecialidadMedica, descripcionMed, imagenUrl]
        );

        const especialidadM = { ...req.body, id: result.insertId };
        res.status(201).json({
            success: true,
            message: "Especialidad médica creada con éxito",
            especialidad: especialidadM
        });
    } catch (error) {
        console.log("Error al insertar la especialidad médica:", error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// PUT modificar
const modificarEspecialidad = async (req, res) => {
    const { idEspecialidad } = req.params;

    if (isNaN(idEspecialidad)) {
        return res.status(400).json({ error: "El id de la especialidad debe ser un número válido" });
    }

    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    const imagenUrl = `/uploads/${req.file.filename}`;
    const { nombreEspecialidadMedica, descripcionMed } = req.body;

    try {
        const [result] = await connection.query(
            "UPDATE especialidades_medicas SET nombre_especialidad_med = ?, descripcion_especialidad_med = ?, imagen_especialidad_med = ? WHERE id_especialidad_medica = ?",
            [nombreEspecialidadMedica, descripcionMed, imagenUrl, idEspecialidad]
        );

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: la especialidad médica a modificar no existe" });
        }

        const especialidadM = { ...req.params, ...req.body, imagenUrl };
        res.json(especialidadM);
    } catch (error) {
        console.log("Error al actualizar la especialidad médica:", error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// DELETE borrar
const borrarEspecialidad = async (req, res) => {
    const { idEspecialidad } = req.params;

    try {
        const [result] = await connection.query(
            "DELETE FROM especialidades_medicas WHERE id_especialidad_medica = ?",
            [idEspecialidad]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: la especialidad médica a eliminar no existe" });
        }
        res.json({ mensaje: "Especialidad médica eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// exportar funciones
export {
    especialidadesMedicas,
    especialidadMedicaId,
    especialidadMedicaNombre,
    crearEspecialidad,
    modificarEspecialidad,
    borrarEspecialidad,
};

