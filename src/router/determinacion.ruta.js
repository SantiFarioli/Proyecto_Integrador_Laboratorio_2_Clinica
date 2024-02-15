import { Router } from 'express';
import {
	getDeterminaciones,
	createDeterminacion,
	updateDeterminacion,
	deleteDeterminacion,
	getDeterminacionPorExamen,
} from '../controllers/determinacion.controller.js';

const router = Router();

router.get('/determinacion', getDeterminaciones);
router.get('/determinacion/examen/:idExamen', getDeterminacionPorExamen);
router.post('/determinacion', createDeterminacion);
router.put('/determinacion/:id', updateDeterminacion);
router.delete('/determinacion/:id', deleteDeterminacion);

export default router;
