import express from 'express'
import librosRoutes from './routes/libros.routes.js'
import prestamosRoutes from './routes/prestamos.routes.js'
import authorsRoutes from './routes/authors.routes.js'
import usuariosRoutes from './routes/usuarios.routes.js'


import './config.js'
const app=express()
app.use(express.json())

// end points Rutas
app.use('/api',librosRoutes)
app.use('/api',prestamosRoutes)
app.use('/api',authorsRoutes)
app.use('/api',usuariosRoutes)


//Manejo de errores cuando la ruta no es encontrada
app.use((req,res,next)=>{
    res.status(400).json({
        message:"Ruta no encontrada... Verificar!"
    })
})

export default app;