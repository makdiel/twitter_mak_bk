import  Express  from "express";
const usuarios = Express();
import { getUsuarios, postUsuarios, 
    deleteUsuario, getUsuariosId, 
    putUsuario,getAuth } from "../controllers/controllerUsuarios.js";

usuarios.post('',postUsuarios )
usuarios.get('', getUsuarios)
usuarios.put('/:nombre_usuario', putUsuario)
usuarios.delete('/:nombre_usuario', deleteUsuario)
usuarios.get('/:nombre_usuario', getUsuariosId)
usuario.get('/auth/:nombre_usuario/:pass', getAuth);


export {
    usuarios
}

