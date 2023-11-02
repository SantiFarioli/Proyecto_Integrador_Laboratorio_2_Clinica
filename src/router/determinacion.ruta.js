import {Router} from 'express';
import {getDeterminaciones, createDeterminacion, updateDeterminacion, deleteDeterminacion} from '../controllers/determinacion.controller.js';

const router = Router();

router.get('/determinacion', getDeterminaciones);
router.post('/determinacion', createDeterminacion);
router.put('/determinacion/:id', updateDeterminacion);
router.delete('/determinacion/:id', deleteDeterminacion);

export default router;