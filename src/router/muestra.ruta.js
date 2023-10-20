import { Router } from 'express';
import { getMuestras, createMuestra, updateMuestra, deleteMuestra } from '../controllers/muestra.controller.js';

const router = Router();

router.get('/muestra', getMuestras);
router.get('/muestra',);
router.post('/muestra', createMuestra);
router.put('/muestra', updateMuestra);
router.delete('/muestra', deleteMuestra);

export default router;