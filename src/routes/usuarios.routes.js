import { addUsuarios, deleteUsuarios, getUsuario, getUsuarios, patchUsuarios } from '../controllers/usuarios.controllers.js';
import { Router } from 'express';
const router = Router();

router.get('/usuarios',getUsuarios)
router.get('/usuarios/:id',getUsuario)
router.post('/usuarios',addUsuarios)
router.delete('/usuarios/:id',deleteUsuarios)
router.patch('/usuarios/:id',patchUsuarios)

export default router;