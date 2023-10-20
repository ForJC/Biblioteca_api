import { pool } from "../db.js";

export const addUsuarios = async(req,res)=>{
  const { Nombre, Direccion, Telefono, Correo_electronico } = req.body
  try {
  const [data] = await pool.query(`INSERT INTO usuarios (Nombre, Direccion, Telefono, Correo_electronico) VALUES (?,?,?,?)`,[Nombre,Direccion, Telefono, Correo_electronico]);
  console.log(data)
  res.send({
      id:data.insertId,
      Nombre,
      Direccion,
      Telefono,
      Correo_electronico, 
  })
 } catch (error) {
  return res.status(500).json({
    message: 'Algo anda mal... por favor de verificar!'
  })
}
}

export const getUsuario = async(req,res)=>{
    try {
    const [rows] = await pool.query(`SELECT *FROM usuario`)
    res.json(rows)
} catch (error) {
    return res.status(500).json({
      message: 'Algo anda mal... por favor de verificar!'
    })
  }
}

export const getUsuarios = async(req,res)=>{
    try {
    const [rows] = await pool.query(`SELECT *FROM usuarios WHERE Usuario_id=?`,[req.params.id])
    res.json(rows)
} catch (error) {
    return res.status(500).json({
      message: 'Algo anda mal... por favor de verificar!'
    })
  }
}


export const deleteUsuarios = async(req,res)=>{
    try {
    const [data]= await pool.query(`DELETE FROM usuarios WHERE Usuario_id=?`,[req.params.id])
    if(data.affectedRows <= 0)return res.status(400).json({
        message:"Usuario no encontrado!"
    })
    res.sendStatus(204)
} catch (error) {
    return res.status(500).json({
      message: 'Algo anda mal... por favor de verificar!'
    })
  }
  
}

export const patchUsuarios = async(req,res)=>{
  const {id}=req.params
  const { Nombre, Direccion, Telefono, Correo_electronico}=req.body
  try {
  const [result]= await pool.query(`UPDATE usuarios SET Nombre= IFNULL(?,Nombre), Direccion=IFNULL(?,Direccion),Telefono= IFNULL(?,Telefono), Correo_electronico = IFNULL(?,Correo_electronico)) WHERE Usuario_id= ?`,[ Nombre,  Direccion,Telefono, Correo_electronico,id])
  if(result.affectedRows===0)res.status(404).json({
      message:"Usuario no encontrado!"
    })
    const [rows] = await pool.query("SELECT * FROM usuario WHERE Usuario_id=?",[id])
    res.json(rows[0])} catch (error) {
      return res.status(500).json({
        message: 'Algo anda mal... por favor de verificar!'
      })
    }
    
  }