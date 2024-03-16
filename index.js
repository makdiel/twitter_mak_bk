import  Express  from "express";
import { Usuarios } from "./routes/routeUsuarios.js";
import { publicacion } from "./routes/routePublicacion.js";
import { comentario } from "./routes/routeComentarios.js"

const app = Express();
import cors from 'cors';

// Middleware 
app.use(Express.json());
const corsOptions = {
    origin : 'http://localhost:5173', 
    credentials : true,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions));
// Rutas
app.use('/api/usuarios', Usuarios);
app.use('/api/publicacion', publicacion);
app.use('/api/comentario', comentario);

//Puerto
app.listen(4000, ()=>{

    console.log("Esuchando en el puerto 4000");

});