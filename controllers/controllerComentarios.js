import { db } from "../db/conn.js";
const putComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const { comentario } = req.body;
        const params = [comentario, id];

        const sql = ` update tbl_comentarios 
                    set comentario = $1
                    where id = $2 returning id, 'Actualizacion Exitosa' mensaje `;

        const result = await db.query(sql, params);

        res.json(result);

    } catch (err) {
        res.status(500).json({ mensaje: err.message })
    }
}

const postComentario = async (req, res) => {
    try {
        const {
            comentario,
            nombre_usuario
        } = req.body;

        const params = [comentario, nombre_usuario];

        const sql = ` insert into tbl_comentarios 
                        ( comentario, nombre_usuario  )
                        values 
                        ($1, $2)
                      returning  id, nombre_usuario, 'Insercion Exitosa' mensaje `;

        const result = await (db.query(sql, params));
        res.json(result)
    } catch (err) {
        res.status(500).json({ mensaje: err.message });
    }
}

const deleteComentario = async (req, res) => {
    try {
        const params = [req.params.id];

        const sql = `delete from tbl_comentarios                      
                where id = $1 
                returning id, 'Comentario Borrado' mensaje `;

        const result = await db.query(sql, params);
        res.json(result);
    } catch (err) {
        res.status(500).json({ mensaje: err.message })
    }
}

const getComentario = async (req, res) => {
    try {

        const sql = `select a.id,a.publicacion,
                            a.nombre_usuario,
                            a.fecha_post ,
                            a.activo,
                            b.comentario,
                            b.nombre_usuario "user" 
                    from tbl_publicacion a 
                    left join tbl_comentarios b on b.publicacion_id = a.id                                             
                    where a.activo = true
                    order by a.fecha_post desc`

        const result = await db.query(sql);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ mensaje: "Sin datos que mostrar" });
        }
    } catch (err) {
        res.status(500).json({ mensaje: "Error en busqueda de post" });
    }
}
export {
    postComentario,
    getComentario,
    deleteComentario,
    putComentario
}