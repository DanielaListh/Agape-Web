import { connection } from '../db/db.js';
import fs from 'fs';

// guardar la img en ruta
function saveImage(file) {
    //const newPath = `../uploads/${file.originalname}`;
    const newPath = `uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

// GET todas las características
const caracteristicasClinica = async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM caracteristicas_clinica");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// GET por ID
const caracteristicaClinicaId = async (req, res) => {
    let { idCaracteristicaClinica } = req.params;
    idCaracteristicaClinica = Number(idCaracteristicaClinica);

    if (!Number.isInteger(idCaracteristicaClinica) || idCaracteristicaClinica <= 0) {
        return res.status(400).json({ error: "El ID ingresado debe ser un número válido" });
    }

    try {
        const [rows] = await connection.query(
            "SELECT * FROM caracteristicas_clinica WHERE idCaracteristicaClinica = ?",
            [idCaracteristicaClinica]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Error: No existe la característica buscada por ID" });
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// GET por nombre
const CaracteristicaClinicaNombre = async (req, res) => {
    let { nombrecaracterClinica } = req.params;

    if (!nombrecaracterClinica) {
        return res.status(400).json({ error: "Error: El parámetro debe ser un texto válido." });
    }

    nombrecaracterClinica = nombrecaracterClinica.trim();
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{1,50}$/;

    if (!regex.test(nombrecaracterClinica)) {
        return res.status(400).json({ error: "Error: El nombre debe contener solo letras y hasta 50 caracteres." });
    }

    try {
        const [rows] = await connection.query(
            "SELECT * FROM caracteristicas_clinica WHERE nombrecaracterClinica LIKE CONCAT(?, '%')",
            [`${nombrecaracterClinica}%`]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Error: No existe la característica buscada" });
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// POST crear
const crearCaracteristicaClinica = async (req, res) => {
    if (!req.file) {
        //return res.status(400).send('No se subió ningún archivo');
        return res.status(400).json({ error: "No se subió ningún archivo" });
    }

    const imagenUrl = saveImage(req.file);
    const { nombrecaracterClinica, descripcioncaracterClinica } = req.body;

    try {
        const [result] = await connection.query(
            "INSERT INTO caracteristicas_clinica (nombrecaracterClinica, descripcioncaracterClinica, imgcaracterClinica) VALUES (?, ?, ?)",
            [nombrecaracterClinica, descripcioncaracterClinica, imagenUrl]
        );

        const caracteristicaC = { ...req.body, id: result.insertId };
        res.status(201).json({
            success: true,
            message: "Característica clínica creada con éxito",
            especialidad: caracteristicaC
        });
    } catch (error) {
        console.log("Error al insertar característica:", error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// PUT modificar
const modificarCaracteristica = async (req, res) => {
    const { idCaracteristicaClinica } = req.params;

    if (isNaN(idCaracteristicaClinica)) {
        return res.status(400).json({ error: "El ID debe ser un número válido" });
    }

    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    const imagenUrl = saveImage(req.file);
    const { nombrecaracterClinica, descripcioncaracterClinica } = req.body;

    try {
        const [result] = await connection.query(
            "UPDATE caracteristicas_clinica SET nombrecaracterClinica = ?, descripcioncaracterClinica = ?, imgcaracterClinica = ? WHERE idCaracteristicaClinica = ?",
            [nombrecaracterClinica, descripcioncaracterClinica, imagenUrl, idCaracteristicaClinica]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Error: la característica no existe" });
        }

        const caracteristicaC = { ...req.params, ...req.body, imagenUrl };
        res.json(caracteristicaC);
    } catch (error) {
        console.log("Error al modificar característica:", error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// DELETE borrar
const borrarCaracteristica = async (req, res) => {
    const { idCaracteristicaClinica } = req.params;

    try {
        const [result] = await connection.query(
            "DELETE FROM caracteristicas_clinica WHERE idCaracteristicaClinica = ?",
            [idCaracteristicaClinica]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Error: la característica no existe" });
        }

        res.json({ mensaje: "Característica clínica eliminada exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// exportar
export {
    caracteristicasClinica,
    caracteristicaClinicaId,
    CaracteristicaClinicaNombre,
    crearCaracteristicaClinica,
    modificarCaracteristica,
    borrarCaracteristica,
};
