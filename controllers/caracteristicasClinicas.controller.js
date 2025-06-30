// controladores del modulo
const { error } = require('console');
const db = require('../db/db');
const fs = require('fs');
//const path = require('path');

//guardar la img en ruta
function saveImage(file) {
    const newPath = `./uploads/${file.originalname}`;// cambiar aqui para que los nombres de las imagenes no se repitan
    fs.renameSync(file.path, newPath);
    return newPath;
}

// Get para todas las caracteristicas
const caracteristicasClinica = (req, res) => {
    const sql = "SELECT * FROM caracteristicas_clinica";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        res.json(rows);
    });
};


//Get para 1 CaracteristicaClinica por ID
const caracteristicaClinicaId = (req,res) =>{
    let { idCaracteristicaClinica }  = req.params;
    idCaracteristicaClinica = Number(idCaracteristicaClinica); //pasa la var a int

    //validar si es un numero y mandar la consulta buscando por id
    if(!Number.isInteger(idCaracteristicaClinica) || idCaracteristicaClinica <= 0){
        return res.status(400).json({error: "El ID ingresado debe ser un numero existente en la base de datos"});
    }
    
    const sqlInt = "SELECT * FROM caracteristicas_clinica WHERE idCaracteristicaClinica = ?"
    db.query(sqlInt,[idCaracteristicaClinica], (error, rows) =>{
        if(error){
              return res.status(500).json({error: "Error: intente mas tarde"});
         }
         if(rows.length == 0){
             return res.status(404).json({ error: "Error: No existe la caracteristica clinica buscada por id" });
        }
        res.json(rows); // nos muestra todos los registros que coinciden con la busqueda
    });
}

// Get para una (1) caracteristica C por nombre
const CaracteristicaClinicaNombre = (req, res) => {
    let { nombrecaracterClinica } = req.params;

    // Validación: debe ser un string y no puede ser un número ni exceder 50 caracteres
    if (!nombrecaracterClinica) {
        return res.status(400).json({
            error: "Error: El parámetro debe ser un texto válido."
        });
    } 

    nombrecaracterClinica = nombrecaracterClinica.trim();// quitamos los espacios vacios

    // Validación: debe contener solo letras y no exceder 50 caracteres
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{1,50}$/;
    if (!regex.test(nombrecaracterClinica)) {
        return res.status(400).json({
            error: "Error: El nombre de la caracteristica debe contener solo letras y tener un máximo de 50 caracteres."
        });
    }

    const sql = "SELECT * FROM caracteristicas_clinica WHERE nombrecaracterClinica LIKE CONCAT(?, '%')"; //sentencia que permite buscar por coincidencias de caracteres
    db.query(sql, [`${nombrecaracterClinica}%`], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (rows.length == 0) {
            return res.status(404).json({ error: "Error: No existe la caracteristica buscada" });
        }
        //res.json(rows[0]);// antes al utilizar [0] solo nos traia el primer registro que coincidia
        res.json(rows); // nos muestra todos los registros que coinciden con la busqueda
    });
};


// post
const crearCaracteristicaClinica = (req, res) => {
    console.log(req.file); // Mostrar los datos en la consola o terminal
    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');
    }

    const imagenUrl = saveImage(req.file); // Guardar la imagen subida y almacenar la URL en imagenUrl
    const { nombrecaracterClinica, descripcioncaracterClinica } = req.body; // Obtener los datos del cuerpo de la solicitud
    const sql = "INSERT INTO caracteristicas_clinica (nombrecaracterClinica, descripcioncaracterClinica, imgcaracterClinica) VALUES (?, ?, ?)";
    //mas adelante hacer que todo lo que se ingrese sea en minusculas
    db.query(sql, [nombrecaracterClinica, descripcioncaracterClinica, imagenUrl], (error, result) => {
        if (error) {
            console.log("Error al insertar la caracteristica:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }

        console.log("Backend: caracteristica clinica insertada correctamente en la base de datos");//ayuda a ver si el backend esta andando bien

        const caracteristicaC = { ...req.body, id: result.insertId };
        res.status(201).json({
            success:true,
            message: "Caracteristica clinica creada con exito",
            especialidad: caracteristicaC
        });//esto se muestra en un formato json
    });
};


// método o controlador put
// lo ideal es que lo busque por nombre y realice la modificacion por el id
const modificarCaracteristica = (req, res) => {
    console.log(req.file); // mostrar los datos en la consola o terminal
    

    const { idCaracteristicaClinica } = req.params; // obtener el id de la especialidad como parámetro para buscar el registro a actualizar
    if (isNaN(idCaracteristicaClinica)) {
        return res.status(400).json({ error: "El id de la caracteristica debe ser un número válido" });
    }
    

    if (!req.file) {
        return res.status(400).send('No se subió ningún archivo');// podemos hacer que no sea necesario pedir esto siempre
    }

    const imagenUrl = saveImage(req.file); // guardar la imagen subida y almacenar la URL en imagenUrl
    const { nombrecaracterClinica ,descripcioncaracterClinica } = req.body; // Obtener los datos del cuerpo de la solicitud
    const sql = "UPDATE caracteristicas_clinica SET nombrecaracterClinica = ?, descripcioncaracterClinica = ?, imgcaracterClinica = ? WHERE idCaracteristicaClinica = ?";
    db.query(sql, [nombrecaracterClinica, descripcioncaracterClinica, imagenUrl, idCaracteristicaClinica], (error, result) => {
        if (error) {
            console.log("Error al actualizar la caracteristica:", error);
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "Error: la caracteristica clinica a modificar no existe" });
        }
        const caracteristicaC = { ...req.params, ...req.body, imagenUrl: imagenUrl };
        res.json(caracteristicaC);
    });
};


// módulo borrar 
const borrarCaracteristica = (req, res) => {
    const { idCaracteristicaClinica } = req.params;
    const sql = "DELETE FROM caracteristicas_clinica WHERE idCaracteristicaClinica = ?";
    db.query(sql, [idCaracteristicaClinica], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "Error: la caracteristica clinica a eliminar no existe" });
        }
        res.json({ mensaje: "Caracteristica clinica eliminada exitosamente" });
    });
};

// exportar las funciones del modulo
module.exports = {
    caracteristicasClinica,
    caracteristicaClinicaId,
    CaracteristicaClinicaNombre,
    crearCaracteristicaClinica,
    modificarCaracteristica,
    borrarCaracteristica,
};