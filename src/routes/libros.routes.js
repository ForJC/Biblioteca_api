import { deleteLibros, getLibro, getLibros, addLibros, patchLibros, getLibrosAutor } from '../controllers/libros.controllers.js'
import { Router } from 'express';
const router=Router();

router.get ('/libros',getLibros)
router.get ('/libros/:id',getLibro)

router.post ('/libros',addLibros)
router.delete ('/libros/:id',deleteLibros)
router.patch('/libros/:id',patchLibros)
router.get('/librosAutor',getLibrosAutor)

export default router;