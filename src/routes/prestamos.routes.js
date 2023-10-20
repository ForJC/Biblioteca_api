import { addPrestamos, deletePrestamos, getPrestamo, getPrestamos, patchPrestamos } from '../controllers/prestamos.controllers.js'
import { Router } from 'express';
const router=Router();

router.get('/prestamos',getPrestamos)
router.get('/prestamos/:id',getPrestamo)
router.post('/prestamos',addPrestamos)
router.patch('/prestamos/:id',patchPrestamos)
router.delete('/prestamos/:id',deletePrestamos)

export default router;
