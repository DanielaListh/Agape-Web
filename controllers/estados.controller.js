//controladores del modulo
const db = require("../db/db");

//metodos get para todos los estados
const obtenerEstados = (req,res) => { // falta el req
    const sql = "SELECT * FROM estados";
    db.query(sql,(error,rows) => {
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        res.json(rows);// si no hay error que devuelva las filas
    });
};


//controlador para un estado por id
const obtenerEstadoID = (req,res) => { //aqui le falto al profe el req y res
    let {idEstado} = req.params; // aqui el profe coloco id_peliculas, pero a mi no me hizo falta
    idEstado = Number(idEstado);

    //validar
    if(!Number.isInteger(idEstado) || idEstado <= 0){
        return res.status(400).json({error: "El ID ingresado debe ser un numero existente en la base de datos"});
    }

    const sqlInt = "SELECT * FROM estados WHERE id_estado = ?"; // se deja el ? para evitar inyeccciones externas
    db.query(sqlInt,[idEstado],(error,rows) => {
        console.log(rows);
        if(error){ // si hay un error que retorne cual es el error
            console.error("Error al obtener la provincia:", error);
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(rows.length == 0){ // si las filas modificadas son cero significa que no encontro nada
            return res.status(404).send({error : "error: No existe la provincia buscada"});
        };
        res.json(rows);// si no hay error que devuelva las filas
    });
};



// Get para una (1) estado o provincia por nombre
const obtenerProvinciaNombre = (req, res) => {
    let {nombreEstado} = req.params;

    // Validación: debe ser un string y no puede ser un número ni exceder 50 caracteres
    if (!nombreEstado) {
        return res.status(400).json({
            error: "Error: El parámetro debe ser un texto válido."
        });
    } 

    nombreEstado = nombreEstado.trim();// quitamos los espacios vacios

    // Validación: debe contener solo letras y no exceder 50 caracteres
    const regex = /^[A-Za-záéíóúÁÉÍÓÚñÑ\s]{1,20}$/;
    if (!regex.test(nombreEstado)) {
        return res.status(400).json({
            error: "Error: El nombre de la provincia debe contener solo letras y tener un máximo de 20 caracteres."
        });
    }

    const sql = "SELECT * FROM estados WHERE nombre_estado LIKE ?"; //sentencia que permite buscar por coincidencias de caracteres
    db.query(sql, [`%${nombreEstado}%`], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error: intente más tarde" });
            // hay que buscar la manera de mostrar los errores en el dom en forma de notificacion
            //para facilidad del usuario n
        }
        if (rows.length == 0) {
            return res.status(404).json({ error: "Error: No existe la provincia buscada" });
        }
        //res.json(rows[0]);// antes al utilizar [0] solo nos traia el primer registro que coincidia
        res.json(rows); // nos muestra todos los registros que coinciden con la busqueda
    });
};

//post
const crearEstado = (req,res) => {
    const {nombreEstado} = req.body;// le mandamos a crear el body

    const sql = "INSERT INTO estados (nombre_estado) VALUES(?)";
    db.query(sql,[nombreEstado],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        //const estadoCreado = {...req.body, id: result.insertId}; // reconstruir el objeto body
        res.status(201).json({mensaje: "provincia creada con exito"}); // muestra el creado con exito
    });
};


//metodo o controlador put
const actualizarEstado = (req,res) => {
    const {idEstado} = req.params; // me pide que requiera el id como parametro
    const {nombreEstado} = req.body;// le mandamos body de los datos a modificar
    const sql="UPDATE estados SET nombre_estado = ?  WHERE id_estado = ?";
    db.query(sql,[nombreEstado, idEstado],(error,result) => {
        console.log(result);
        if(error){ // si hay un error que retorne cual es el error
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "Error: el estado a modificar no existe"})
        }
        const estadoActualizado = {...req.body, ...req.params}; // reconstruir el objeto body y los perametros que trae
        res.json(estadoActualizado);// se muestra el elemento que existe
       
    });

};


//modulo borrar
const borrarEstado = (req,res) => {
    const{idEstado} = req.params;
    const sql ="DELETE FROM estados WHERE id_estado = ?";
    db.query(sql,[idEstado], (error,result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "Error: intente mas tarde"});
        }
        if(result.affectedRows == 0){ // si no hay ninguna fila afectada es un error
            return res.status(404).send({error : "Error: el estado a eliminar no existe "});
        };
        res.json({mensaje : "Estado eliminado correctamente"});
    });
};

//exportar las funciones del modulo
module.exports = {
    obtenerEstados,
    obtenerEstadoID,
    obtenerProvinciaNombre,
    crearEstado,
    actualizarEstado,
    borrarEstado,
};