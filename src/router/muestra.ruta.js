import {Router} from 'express';
import { getMuestras, createMuestra, updateMuestra, deleteMuestra} from '../controllers/muestra.controller.js';

const router = Router();

router.get('/muestra', getMuestras);
router.post('/muestra', createMuestra);
router.put('/muestra/:id', updateMuestra);
router.delete('/muestra/:id', deleteMuestra);

export default router;