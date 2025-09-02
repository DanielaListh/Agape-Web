import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import { connection } from '../db/db.js';
//import { v4 as uuidv4 } from 'uuid';

// guardar la img en ruta
function saveImage(file) {
    //const newPath = `../uploads/${file.originalname}`;
    const newPath = `uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}


// version nueva, al crear un usuario este tomara valores por default, se agrega una img default 
const crearUsuario = async (req, res) => {
    try {
        //const imagenUrl = req.file ? saveImage(req.file) : null;// sera una img por default
        //como agregar una imagen por defecto cada vez que se crea un usuario?
        const imagenUrl = 'userDefault.jpg'

        const { correoElectronico, password, idRol } = req.body;
        const rolInt = parseInt(idRol, 10);
        const hash = bcrypt.hashSync(password, 8);

        const sqlUsuario = `
            INSERT INTO usuarios (
                correo_electronico, password, id_rol, imagen_perfil_usuario) 
                VALUES (?, ?, ?, ?)`;

        const [result] = await connection.query(sqlUsuario, [
            correoElectronico,
            hash,
            rolInt,
            imagenUrl,
        ]);

        const idUsuario = result.insertId;
        const tareas = [];

        if (rolInt === 2) {
            tareas.push(connection.query(
                "INSERT INTO medicos (id_usuario, codigo_medico, biografia_medico) VALUES (?, 'none', 'none')",
                [idUsuario]
            ));
        }

        if (rolInt === 3) {
            tareas.push(connection.query(
                "INSERT INTO administradores (id_usuario, permisos, estado_conexion, ultima_conexion) VALUES (?, 'none', ?, ?)",
                [idUsuario, 0, new Date()]
            ));
        }

        await Promise.all(tareas);

        const token = jwt.sign({ id: idUsuario }, process.env.SECRET_KEY, { expiresIn: "1h" });

        res.status(201).json({
            userCreado: { id: idUsuario, ...req.body },
            token,
            necesitaEspecialidad: rolInt === 2
        });

    } catch (error) {
        console.error('Error en la creación del usuario:', error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};



////////////////////////////

const loginUsuario = async (req, res) => {
    const { correoElectronico, password } = req.body || {};

    if (!correoElectronico || !password) {
        return res.status(400).json({
            error: "Respuesta del backend: Correo electrónico y contraseña son requeridos"
        });
    }

    const correo = correoElectronico.trim().toLowerCase();

    try {
        const sql = `
            SELECT id_usuario, nombre_usuario, correo_electronico, password, id_rol 
            FROM usuarios 
            WHERE LOWER(correo_electronico) = ?
        `;

        const [results] = await connection.query(sql, [correo]);

        if (results.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const user = results[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).json({ error: "Credenciales inválidas" });
        }

        const token = jwt.sign(
            { id: user.id_usuario, idRol: user.id_rol },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token,
            user: {
                id_usuario: user.id_usuario,
                nombre_usuario: user.nombre_usuario, // ojo: era nombreUsuario pero la db trae nombre_usuario
                id_rol: user.id_rol
            }
        });

    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};

// GET todos los usuarios
const obtenerUsuarios = async (req, res) => {
    try {
        const [rows] = await connection.query("SELECT * FROM usuarios");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// GET un usuario por ID
const obtenerUsuario = async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const [rows] = await connection.query(
            "SELECT * FROM usuarios WHERE id_usuario = ?",
            [idUsuario]
        );
        if (rows.length === 0) {
            return res.status(404).send({ error: "Error: No existe el usuario buscado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

//hacer get de nombre de usuario
const usuarioNombre = async (req, res) => {
    let { nombreUsuario } = req.params;

    if (!nombreUsuario) {
        return res.status(400).json({ error: "Error: El parámetro debe ser un texto válido." });
    }

    nombreUsuario = nombreUsuario.trim();
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{1,50}$/;

    if (!regex.test(nombreUsuario)) {
        return res.status(400).json({
            error: "Error: El nombre de usuario debe contener solo letras y tener un máximo de 50 caracteres."
        });
    }

    try {
        const [rows] = await connection.query(
            "SELECT * FROM usuarios WHERE nombre_usuario LIKE CONCAT(?, '%')",
            [`${nombreUsuario}%`]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: "Error: No existe el usuario buscado" });
        }
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

// Noticias de version nueva
// los datos nombre_usuario, fecha_nacimiento, id_genero, imagen_perfil_usuario son datos que
// al crearse un nuevo usuario tendran el valor de nulos por default, ya que se desea poder 
//registrar un usuario con solo 3 datos. 
// Con esto, al actualizar un usuario se podran modificar esos valores nulos por los personales

// PUT actualizar usuario
const actualizarUsuario = async (req, res) => {
    const { idUsuario } = req.params;

    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    const imagenUrl = saveImage(req.file);
    const { nombreUsuario, correoElectronico, password, fechaNacimiento, idRol, idGenero } = req.body;
    const hash = bcrypt.hashSync(password, 8);

    try {
        const sqlUpdate = `
            UPDATE usuarios SET
                nombre_usuario = ?, correo_electronico = ?, password = ?,
                fecha_nacimiento = ?, id_rol = ?, imagen_perfil_usuario = ?, id_genero = ?
            WHERE id_usuario = ?
        `;

        await connection.query(sqlUpdate, [
            nombreUsuario, correoElectronico, hash,
            fechaNacimiento, idRol, imagenUrl, idGenero,
            idUsuario
        ]);

        const [result] = await connection.query(
            "SELECT * FROM usuarios WHERE id_usuario = ?",
            [idUsuario]
        );

        res.status(200).json({
            message: "El usuario se ha actualizado correctamente",
            user: result[0]
        });

    } catch (error) {
        res.status(500).json({ error: `Error al actualizar el usuario ${idUsuario}` });
    }
};

// DELETE eliminar usuario
const eliminarUsuario = async (req, res) => {
    const { idUsuario } = req.params;

    try {
        const [userRows] = await connection.query(
            "SELECT id_rol FROM usuarios WHERE id_usuario = ?",
            [idUsuario]
        );

        if (userRows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const idRol = userRows[0].id_rol;

        if (idRol === 2) {
            await connection.query("DELETE FROM medicos_especialidades WHERE id_usuario = ?", [idUsuario]);
            await connection.query("DELETE FROM medicos WHERE id_usuario = ?", [idUsuario]);
        }

        await connection.query("DELETE FROM usuarios WHERE id_usuario = ?", [idUsuario]);

        const mensaje =
            idRol === 2
                ? "Usuario, médico y su/s especialidad/es fueron eliminados correctamente"
                : "Usuario eliminado correctamente";

        res.status(200).json({ message: mensaje });

    } catch (error) {
        res.status(500).json({ error: "Error: intente más tarde" });
    }
};

export {
    crearUsuario,
    loginUsuario,
    obtenerUsuarios,
    obtenerUsuario,
    usuarioNombre,
    actualizarUsuario,
    eliminarUsuario,
    // obtenerPerfilUsuario (cuando lo sume)
};
