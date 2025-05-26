// controladores del modulo
const { error } = require('console');
const db = require('../db/db');
const fs = require('fs');
//const path = require('path');

//guardar la img en ruta
function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}

// Get para todas las especialidades
const especialidadesMedicas = (req, res) => {
    const sql = "SELECT * FROM especialidades_medicas";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        res.json(rows);
    });
};


//Get para 1 especialidad por ID
const especialidadMedicaId = (req,res) =>{
    let { idEspecialidad }  = req.params;
    idEspecialidad = Number(idEspecialidad); //pasa la var a int

    //validar si es un numero y mandar la consulta buscando por id
    if(!Number.isInteger(idEspecialidad) || idEspecialidad <= 0){
        return res.status(400).json({error: "El ID ingresado debe ser un numero existente en la base de datos"});
    }
    
    const sqlInt = "SELECT * FROM especialidades_medicas WHERE id_especialidad_medica = ?"
    db.query(sqlInt,[idEspecialidad], (error, rows) =>{
        if(error){
              return res.status(500).json({error: "Error: intente mas tarde"});
         }
         if(rows.length == 0){
             return res.status(404).json({ error: "Error: No existe la especialidad buscada por id" });
        }
        res.json(rows); // nos muestra todos los registros que coinciden con la busqueda
    });
}

// Get para una (1) especialidad por nombre
const especialidadMedicaNombre = (req, res) => {
    let { nombreEspecialidadMedica} = req.params;

    // Validación: debe ser un string y no puede ser un número ni exceder 50 caracteres
    if (!nombreEspecialidadMedica) {
        return res.status(400).json({
            error: "Error: El parámetro debe ser un texto válido."
        });
    } 

    nombreEspecialidadMedica = nombreEspecialidadMedica.trim();

    // Validación: debe contener solo letras y no exceder 50 caracteres
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{1,50}$/;
    if (!regex.test(nombreEspecialidadMedica)) {
        return res.status(400).json({
            error: "Error: El nombre de la especialidad debe contener solo letras y tener un máximo de 50 caracteres."
        });
    }

    const sql = "SELECT * FROM especialidades_medicas WHERE nombre_especialidad_med LIKE CONCAT(?, '%')"; //sentencia que permite buscar por coincidencias de caracteres
    db.query(sql, [`${nombreEspecialidadMedica}%`], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
            // hay que buscar la manera de mostrar los errores en el dom en forma de notificacion
            //para facilidad del usuario n
        }
        if (rows.length == 0) {
            return res.status(404).json({ error: "Error: No existe la especialidad buscada" });
        }
        //res.json(rows[0]);// antes al utilizar [0] solo nos traia el primer registro que coincidia
        res.json(rows); // nos muestra todos los registros que coinciden con la busqueda
    });
};


// post
const crearEspecialidad = (req, res) => {
    console.log(req.file); // Mostrar los datos en la consola o terminal
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    const imagenUrl = saveImage(req.file); // Guardar la imagen subida y almacenar la URL en imagenUrl
    const { nombreEspecialidadMedica, descripcionMed } = req.body; // Obtener los datos del cuerpo de la solicitud
    const sql = "INSERT INTO especialidades_medicas (nombre_especialidad_med, descripcion_especialidad_med, imagen_especialidad_med) VALUES (?, ?, ?)";
    //mas adelante hacer que todo lo que se ingrese sea en minusculas
    db.query(sql, [nombreEspecialidadMedica, descripcionMed, imagenUrl], (error, result) => {
        if (error) {
            console.log("Error al insertar la especialidad médica:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }

        console.log("Backend: Especialidad médica insertada correctamente en la base de datos");//ayuda a ver si el backend esta andando bien

        const especialidadM = { ...req.body, id: result.insertId };
        res.status(201).json({
            success:true,
            message: "Especialidad medica creada con exito",
            especialidad: especialidadM
        });//esto se muestra en un formato json
    });
};


// método o controlador put
// lo ideal es que lo busque por nombre y realice la modificacion por el id
const modificarEspecialidad = (req, res) => {
    console.log(req.file); // mostrar los datos en la consola o terminal
    

    const { idEspecialidad } = req.params; // obtener el id de la especialidad como parámetro para buscar el registro a actualizar
    if (isNaN(idEspecialidad)) {
        return res.status(400).json({ error: "El id de la especialidad debe ser un número válido" });
    }
    

    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    const imagenUrl = saveImage(req.file); // guardar la imagen subida y almacenar la URL en imagenUrl
    const { nombreEspecialidadMedica ,descripcionMed } = req.body; // Obtener los datos del cuerpo de la solicitud
    const sql = "UPDATE especialidades_medicas SET nombre_especialidad_med = ?, descripcion_especialidad_med = ?, imagen_especialidad_med = ? WHERE id_especialidad_medica = ?";
    db.query(sql, [nombreEspecialidadMedica, descripcionMed, imagenUrl, idEspecialidad], (error, result) => {
        if (error) {
            console.log("Error al actualizar la especialidad médica:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: la especialidad médica a modificar no existe" });
        }
        const especialidadM = { ...req.params, ...req.body, imagenUrl: imagenUrl };
        res.json(especialidadM);
    });
};


// módulo borrar 
const borrarEspecialidad = (req, res) => {
    const { idEspecialidad } = req.params;
    const sql = "DELETE FROM especialidades_medicas WHERE id_especialidad_medica = ?";
    db.query(sql, [idEspecialidad], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "Error: la especialidad medica a eliminar no existe" });
        }
        res.json({ mensaje: "Especialidad medica eliminada correctamente" });
    });
};

// exportar las funciones del modulo
module.exports = {
    especialidadesMedicas,
    especialidadMedicaId,
    especialidadMedicaNombre,
    crearEspecialidad,
    modificarEspecialidad,
    borrarEspecialidad,
};
