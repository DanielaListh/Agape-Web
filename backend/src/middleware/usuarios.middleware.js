import jwt from "jsonwebtoken";
import { connection } from "../db/db.js";

// Middleware de verificación de token y obtención del nombre del usuario
const usuariosMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(403).json({ auth: false, message: "No se proporcionó un token" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({ auth: false, message: "Token malformado" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            return res.status(500).json({ auth: false, message: "Falló la autenticación del token" });
        }

        req.userId = decoded.id;

        // Consultar nombre del usuario por su ID
        const sql = "SELECT nombre_usuario FROM usuarios WHERE id_usuario = ?";
        connection.query(sql, [req.userId], (err, results) => {
            if (err) {
                return res.status(500).json({ auth: false, message: "Error al consultar el nombre del usuario" });
            }

            if (results.length === 0) {
                return res.status(404).json({ auth: false, message: "Usuario no encontrado" });
            }

            req.userName = results[0].nombre_usuario;
            next();
        });
    });
};

export default usuariosMiddleware;



