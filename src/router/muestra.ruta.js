import { Router } from 'express';
import { getMuestras,
        createMuestra, 
        updateMuestra, 
        deleteMuestra,
     } from '../controllers/muestra.controller.js';

const router = Router();

router.get('/muestra', getMuestras);
router.post('/muestra', createMuestra);
router.get('/muestra');
router.put('/muestra/idMuestra', updateMuestra);
router.delete('/muestra/idMuestra', deleteMuestra);

export default router;