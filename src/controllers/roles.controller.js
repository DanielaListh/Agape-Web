import { connection } from "../db/db.js";

// GET todos los roles
const obtenerRoles = async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM roles");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// GET un rol por ID
const obtenerRol = async (req, res) => {
    const { id_rol } = req.params;

    try {
        const [rows] = await connection.query(
            "SELECT * FROM roles WHERE id_rol = ?",
            [id_rol]
        );
        if (rows.length === 0) {
            return res.status(404).send({ error: "Error: No existe el rol buscado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// POST crear nuevo rol
const crearRol = async (req, res) => {
    const { nombreRol, descripcionRol } = req.body;

    try {
        const [result] = await connection.query(
            "INSERT INTO roles (nombre_rol, descripcion_rol) VALUES (?, ?)",
            [nombreRol, descripcionRol]
        );
        const rolCreado = { ...req.body, id: result.insertId };
        res.status(201).json(rolCreado);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// PUT actualizar rol existente
const actualizarRol = async (req, res) => {
    const { id_rol } = req.params;
    const { nombreRol, descripcionRol } = req.body;

    try {
        const [result] = await connection.query(
            "UPDATE roles SET nombre_rol = ?, descripcion_rol = ? WHERE id_rol = ?",
            [nombreRol, descripcionRol, id_rol]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: el rol a modificar no existe" });
        }
        const RolActualizado = { ...req.body, ...req.params };
        res.json(RolActualizado);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// DELETE eliminar rol
const borrarRol = async (req, res) => {
    const { id_rol } = req.params;

    try {
        const [result] = await connection.query(
            "DELETE FROM roles WHERE id_rol = ?",
            [id_rol]
        );
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: el rol a eliminar no existe" });
        }
        res.json({ mensaje: "Rol eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// Exportar funciones
export {
    obtenerRoles,
    obtenerRol,
    crearRol,
    actualizarRol,
    borrarRol,
};