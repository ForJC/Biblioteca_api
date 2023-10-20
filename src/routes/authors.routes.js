import { addAuthor,deleteAuthors,getAuthor,getAuthors, patchAuthors } from '../controllers/authors.controllers.js';

import { Router } from 'express';
const router=Router();

//end points (Rutas)
router.get('/authors',getAuthors);
router.get('/authors/:id',getAuthor);
router.post('/authors',addAuthor);
router.delete('/authors/:id',deleteAuthors);
router.patch('/authors/:id',patchAuthors);

export default router;