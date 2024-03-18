import  Express  from "express";
const comentario = Express();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer( {storage : storage} );

import {  postComentario,
    getComentario,
    deleteComentario,
    putComentario,postComentar } from "../controllers/controllerComentarios.js";

comentario.post ('/', postComentario )

comentario.post ('/:publicacion_id', postComentar )


comentario.get ('' , getComentario);

comentario.delete ('/:id' , deleteComentario);

comentario.put ('/:id' , putComentario);

export {comentario}