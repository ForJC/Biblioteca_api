import { pool } from '../db.js';

export const getLibros =async(req,res)=>{
    const [rows] = await pool.query(`SELECT *FROM libros`)
    res.json(rows)
}
export const getLibro = async(req,res)=>{
    const [rows] = await pool.query(`SELECT *FROM libros WHERE ISBN = ?`,[req.params.id])
    res.json(rows)
}

export const addLibros = async(req,res)=>{
    try {
        const {Autor,Titulo,CantidadDisponible, genero} = req.body
        const [autor] = await pool.query(`SELECT Autor_id FROM autores WHERE Nombre = ?`,[Autor])
        if(autor.length > 0){
            const id = autor[0].Autor_id
            const [rows] = await pool.query(`INSERT INTO libros (Autor_id,Titulo,Cantidad_disponible,genero) VALUES (?,?,?,?)`,[id,Titulo,CantidadDisponible, genero])
            if(rows.affectedRows > 0){
                res.status(200).json({
                    message: 'Libro insertado de manera correcta'
                })
            }else{
                res.status(404).json({
                    message:"Algo salio mal al insertar el libro!!!"
                })
            }
        }else{
            res.status(400).json({
                message:"Autor no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Algo salio mal no se pudo conectar a la base de datos"
        })
    }
        
}

export const deleteLibros =async(req,res)=>{
    try {
        const [rows] = await pool.query(`DELETE FROM libros WHERE ISBN =?`,[req.params.id])
        if(rows.affectedRows>0){
            res.status(200).json({
                message:"Libro eliminado exitosamente"
            })
        }else{
            res.status(400).json({
                message:"Algo salio mal no se elimino el libro deseado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Algo salio mal no hay conexion a la base de datos"
        })
    }
    
}

  
export const patchLibros = async(req,res)=>{
    try {
        const {AutorId,Titulo,CantidadDisponible, genero} = req.body
        const [rows] = await pool.query(`UPDATE libros SET Autor_id=ifNULL(?,Autor_id), Titulo=ifNULL(?,Titulo),Cantidad_disponible=ifNULL(?,Cantidad_disponible),genero=ifNULL(?,genero) WHERE ISBN = ?`,[AutorId,Titulo,CantidadDisponible, genero,req.params.id])
        if(rows.affectedRows>0){
            res.status(200).json({
                message:"Actualizacion exitosa!!!"
            })
        }else{
            res.status(400).json({
                message:"Algo salio mal no se pudo acer la actualizacion solicitada!!!"
            })
        } 
    } catch (error) {
        res.status(500).json({
            message: "Algo salio mal no pudimos conectar a la base de datos"
        })
    }
           
}

export const getLibrosAutor = async(req,res)=>{
    try {
        const {Autor}= req.body
        const [autor] = await pool.query(`SELECT Autor_id FROM autores WHERE Nombre = ?`, [Autor])
        if(autor.length>0){
            const AutorId = autor[0].Autor_id
            const [rows] = await pool.query(`SELECT ISBN, Titulo, genero FROM libros,Autores WHERE autores.Autor_id = ? `,[AutorId])
            if(rows.length>0){
                res.json(rows)
            }else{
                res.status(400).json({
                    message:`No se encontraron libros con este Autor ${Autor}`   
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Algo salio mal no pudimos conectar a la base de datos"
        })
    }
}