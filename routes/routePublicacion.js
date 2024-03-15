import  Express  from "express";
const publicacion = Express();
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer( {storage : storage} );

import { postPublicacion , getPublicaciones,
     deletePublicacion, putPublicacion } from "../controllers/controllerPublicacion.js";

publicacion.post ('', postPublicacion )

publicacion.get ('' , getPublicaciones);

publicacion.delete ('/:id' , deletePublicacion);

publicacion.put ('/:id' , putPublicacion);

export {publicacion}