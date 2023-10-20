import { pool } from '../db.js';

export const addAuthor = async (req, res) => {
  // res.send("Agregando autores!")
  // console.log(req.body)
  const { Nombre, Nacionalidad, Fecha_nacimiento } = req.body;
  try {
    const [data] = await pool.query(
      "INSERT INTO autores ( Nombre,  Nacionalidad,Fecha_nacimiento) VALUES (?,?,?)",
      [Nombre, Nacionalidad, Fecha_nacimiento]
    );
    console.log(data);
    res.send({
      id: data.insertId,
      Nombre,
      Nacionalidad,
      Fecha_nacimiento
    })
  } catch (error) {
    return res.status(404).json({
      message: 'Algo anda mal... por favor de verificar!'
    })
  }

}
export const getAuthors=async(req,res)=>{
    // res.send("Obteniendo Authors!")
    try {
      const [rows] = await pool.query(`SELECT *FROM autores`)
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message: 'Algo anda mal... por favor de verificar!'
      })
    }
}

export const getAuthor=async(req,res)=>{
    // res.send("Obteniendo Authors!")
    try {
      const [rows] = await pool.query(`SELECT * FROM autores where Autor_id = ?`,[req.params.id])
      res.json(rows)
    } catch (error) {
      return res.status(500).json({
        message: 'Algo anda mal... por favor de verificar!'
      })
    }
    
}
export const deleteAuthors = async(req,res)=>{
  try {
    const [data]= await pool.query(`DELETE FROM autores WHERE Autor_id=?`,[req.params.id])
    if(data.affectedRows <= 0)return res.status(400).json({
      meensage:"Autor no encontrado!"
    })
    res.sendStatus(204)
  } catch (error) {
    return res.status(500).json({
      message: 'Algo anda mal... por favor de verificar!'
    })
  }
  
}

export const patchAuthors = async(req,res)=>{
  const {id}=req.params//de la url
  const {Nombre, Nacionalidad,Fecha_nacimiento}=req.body 
  try {
    const [result]=await pool.query
    ("UPDATE autores SET Nombre = IFNULL(?,Nombre), Nacionalidad = IFNULL(?,Nacionalidad),Fecha_nacimiento = IFNULL(?,Fecha_nacimiento) WHERE Autor_id=?", [Nombre, Nacionalidad,Fecha_nacimiento, id])
    //ifNULL valida los datos en caso de que no existan valores y solo actualiza los que si existan
    if(result.affectedRows===0)res.status(404).json({
      message:"Author no encontrado"
    })
    const [rows] = await pool.query("SELECT *FROM autores WHERE Autor_id=?",[id])
    res.json(rows[0])
  } catch (error) {
    return res.status(500).json({
      message: 'Algo anda mal... por favor de verificar!'
    })
  }
  
}
