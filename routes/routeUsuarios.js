import  Express  from "express";

const Usuarios = Express();

import { getUsuarios, postUsuarios, 
    deleteUsuario, getUsuariosId, 
    putUsuario,getAuth } from "../controllers/controllerUsuarios.js";

Usuarios.use(Express.json());


Usuarios.post('',postUsuarios )
Usuarios.get('', getUsuarios)
Usuarios.put('/:nombre_usuario', putUsuario)
Usuarios.delete('/:nombre_usuario', deleteUsuario)
Usuarios.get('/:nombre_usuario', getUsuariosId)
Usuarios.get('/auth/:nombre_usuario/:pass', getAuth);


export {
    Usuarios
}

