// DISCLAIMER NO ESTA ANDANDO POR UN TEMA EN USUARIOS CON ROLES
import { connection } from "../db/db.js";

// Vista para el formulario (frontend)
const renderizarFormularioEspecialidades = (req, res) => {
    res.render('formulario_especialidades');
};

// GET todos los registros
const obtenerMedicosEspecialidades = async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM medicos_especialidades");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// GET una especialidad de médico por ID
const obtenerMedicosEspecialidad = async (req, res) => {
    const { idMedicoEspecialidad } = req.params;

    try {
        const [rows] = await connection.query(
            "SELECT * FROM medicos_especialidades WHERE id_medico_especialidad = ?",
            [idMedicoEspecialidad]
        );
        if (rows.length === 0) {
            return res.status(404).send({ error: "Error: no existe la especialidad del médico buscado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// POST agregar especialidad al médico
const agregarMedicoEspecialidad = async (req, res) => {
    const { idUsuario, idEspecialidadMedica, fechaExperiencia } = req.body;

    try {
        const [result] = await connection.query(
            "INSERT INTO medicos_especialidades (id_usuario, id_especialidad_medica, fecha_experiencia) VALUES (?, ?, ?)",
            [idUsuario, idEspecialidadMedica, fechaExperiencia]
        );
        const medicoEspecialidad = {
            id: result.insertId,
            idUsuario,
            idEspecialidadMedica,
            fechaExperiencia
        };
        res.status(201).json(medicoEspecialidad);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// PUT actualizar especialidad médica
const actualizarMedicoEspecialidad = async (req, res) => {
    const { idMedicoEspecialidad } = req.params;
    const { idUsuario, idEspecialidadMedica, fechaExperiencia } = req.body;

    try {
        const [result] = await connection.query(
            "UPDATE medicos_especialidades SET id_usuario = ?, id_especialidad_medica = ?, fecha_experiencia = ? WHERE id_medico_especialidad = ?",
            [idUsuario, idEspecialidadMedica, fechaExperiencia, idMedicoEspecialidad]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: los datos a modificar no existen." });
        }
        const MedicosEspecialidadActualizado = { ...req.body, ...req.params };
        res.json(MedicosEspecialidadActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// DELETE eliminar especialidad médica
const borrarMedicoEspecialidad = async (req, res) => {
    const { idMedicoEspecialidad } = req.params;

    try {
        const [result] = await connection.query(
            "DELETE FROM medicos_especialidades WHERE id_medico_especialidad = ?",
            [idMedicoEspecialidad]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: el médico con las especialidades a eliminar no existe" });
        }
        res.json({ mensaje: "Especialidades del médico eliminadas correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// Exportar funciones
export {
    renderizarFormularioEspecialidades,
    obtenerMedicosEspecialidades,
    obtenerMedicosEspecialidad,
    agregarMedicoEspecialidad,
    actualizarMedicoEspecialidad,
    borrarMedicoEspecialidad
};