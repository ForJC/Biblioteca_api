import { pool } from '../db.js';

export const getPrestamos = async(req,res)=>{
    try {
        const [rows] = await pool.query(`SELECT *FROM prestamos`)
        if(rows.length>0){
            res.json(rows)
        }
    } catch (error) {
        res.status(500).json({
            message: "Algo salio mal no pudimos conectar a la base de datos"
        })
    }
    
}

export const getPrestamo = async(req,res)=>{
    try {
        const [rows] = await pool.query(`SELECT *FROM prestamos WHERE Prestamo_id = ?`,[req.params.id])
        res.json(rows)
    } catch (error) {
        res.status(500).json({
            message: "Algo salio mal no pudimos conectar a la base de datos"
        })
    }
    
}

export const addPrestamos = async(req,res)=>{
    try {
        const {Usuario,Libro,Fecha_devolucion}=req.body
        const [rows] = await pool.query(`SELECT Usuario_id FROM usuarios WHERE Nombre = ?`,[Usuario])
        if(rows.length>0){
            const UsuarioId = rows[0].Usuario_id
            const [rows1] = await pool.query(`SELECT ISBN  FROM libros WHERE Titulo=?`,[Libro])
            if(rows1.length>0){
                const libroId = rows1[0].ISBN
                const [rows2]= await pool.query(`INSERT INTO prestamos (Usuario_id,ISBN,Fecha_devolucion) VALUES (?,?,?)`,[UsuarioId,libroId,Fecha_devolucion])
                if(rows2.affectedRows>0){
                    res.status(200).json({
                        message: "prestamo realizado correctamente!!!"
                    })
                }else{
                    res.status(400).json({
                        message: "Algo salio mal no se pudo hacer el prestamo"
                    })
                }
            }else{
                res.status(400).json({
                    message:"Libro no encontrado"
                })
            }
        }else{
            res.status(400).json({
                message:"Usuario no encontrado"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Algo salio mal no pudimos conectar a la base de datos"
        })
    }    
}

export const patchPrestamos = async(req,res)=>{
    try {
        const {UsuarioId,ISBN,Fecha_devolucion}=req.body
        const [rows] = await pool.query(`UPDATE prestamos SET Usuario_id = ifNULL(?,Usuario_id),ISBN = ifNULL(?,ISBN),Fecha_devolucion = ifNULL(?,Fecha_devolucion) WHERE Prestamo_id = ?`,[UsuarioId,ISBN,Fecha_devolucion,req.params.id])
        if(rows.affectedRows>0){
            res.status(200).json({
                message: "Actualizacion exitosa"
            })
        }else{
            res.status(400).json({
                message: "Algo salio mal no se realizo la actualizacion"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: "Algo salio mal no hay conexion a la base de datos"
        })
    }
    
}

export const deletePrestamos = async(req,res)=>{
    try {
        const [rows]=await pool.query(`DELETE FROM prestamos WHERE Prestamo_id =?`,[req.params.id])
        if(rows.affectedRows>0){
            res.status(200).json({
                message:"Prestamo eliminado correctamente"
            })
        }else{
            res.status(200).json({
                message:"No se pudo eliminar el registro"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Algo salio mal no podemos conectar a la base de datos"
        })
    }
}