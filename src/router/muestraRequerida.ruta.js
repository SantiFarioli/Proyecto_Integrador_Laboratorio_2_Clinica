import { Router } from 'express';
import {
	getMuestras,
	createMuestra,
	updateMuestra,
	deleteMuestra,
} from '../controllers/muestraRequerida.controller.js';

const router = Router();

router.get('/muestraRequerida', getMuestras);
router.post('/muestraRequerida', createMuestra);
router.put('/muestraRequerida/:id', updateMuestra);
router.delete('/muestraRequerida/:id', deleteMuestra);

export default router;
