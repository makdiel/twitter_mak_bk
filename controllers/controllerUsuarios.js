import { json } from "express";
import { db } from "../db/conn.js";

const getAuth = async (req, res)=>{
    const {nombre_usuario , pass} = req.params;
    const sql = ` select nombre_usuario from tbl_usuarios 
                    where nombre_usuario = $1 
                    and contrasena = $2  `;

    const result = await db.query(sql, [nombre_usuario, pass]);
    if (result.length === 0 ){
        res.status(404).json({mensaje: "Usuario y Contraseña no coinciden"})
    }else {
        res.json(result);
    }
}

const getUsuarios = async (req, res) => {
    try {
        const sql = `select a.nombre_usuario ,
                        a.correo_electronico,
                        a.contrasena,
                        a.nombre,                       
                        a.id_rol , 
                        b.nombre_rol, 
                        a.activo
                from    tbl_usuarios a 
                inner join  tbl_rol b  on a.id_rol = b.id `;

        const result = await db.query(sql);
        res.json(result);
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
};

const postUsuarios = async (req, res) => {
    try {
        const {
            nombre_usuario,
            correo_electronico,
            contrasena,
            nombre,           
            activo,
            id_rol
        } = req.body;

        const params = [nombre_usuario,
            correo_electronico,
            contrasena,
            nombre,            
            activo,
            id_rol];

        const sql = `insert into tbl_usuarios
                (nombre_usuario , correo_electronico , contrasena , 
                nombre ,  activo, id_rol)
                values 
                ($1, $2, $3, $4, $5, $6)
                returning nombre_usuario , 'Usuario creado con exito' mensaje `

        const result = await db.query(sql, params);
        res.json(result);
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
}

const deleteUsuario = async (req, res) => {
    try {
        const { nombre_usuario } = req.params;

        const sql = `update tbl_usuarios
                    set activo = false
                    where nombre_usuario  = $1
                    returning nombre_usuario , 'Actualizacion Exitosa' mensaje `;

        const result = await db.query(sql, [nombre_usuario]);
        console.log(result);
        res.json(result);
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
};


const putUsuario = async (req, res) => {
    try {
        const {
            correo_electronico,
            contrasena,
            nombre,           
            activo,
            id_rol } = req.body;

        const { nombre_usuario } = req.params;
        console.log(nombre_usuario)

        const sql = ` update tbl_usuarios
        set correo_electronico = $1,
        contrasena = $2,
        nombre = $3,       
        activo = $4,
        id_rol = $5
        where nombre_usuario = $6
        returning nombre_usuario, 'Usuario Actualizado con Exito' mensaje `;

        const params = [correo_electronico,
            contrasena,
            nombre,            
            activo,
            id_rol,
            nombre_usuario]
        const result = await db.query(sql, params);        
        res.json(result);
    } catch (err) {
        res.status(500).json({ mensaje: err.message })
    }

}

const getUsuariosId = async (req, res) => {

    try {
        const {nombre_usuario} = req.params;
        const sql = `select a.nombre_usuario ,
                        a.correo_electronico,
                        a.contrasena,
                        a.nombre,                        
                        a.id_rol , 
                        b.nombre_rol, 
                        a.activo
                from    tbl_usuarios a 
                inner join  tbl_rol b  on a.id_rol = b.id
                where a.nombre_usuario = $1 `;
        const result = await db.query(sql, [nombre_usuario]);
        res.json(result);
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
};

export {
    getUsuarios,
    postUsuarios,
    deleteUsuario,
    getUsuariosId, 
    putUsuario,
    getAuth
}