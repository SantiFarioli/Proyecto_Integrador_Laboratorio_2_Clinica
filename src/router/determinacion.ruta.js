import { Router } from 'express';
import {
	getDeterminaciones,
	createDeterminacion,
	updateDeterminacion,
	deleteDeterminacion,
	getDeterminacionPorExamen,
} from '../controllers/determinacion.controller.js';

const router = Router();

<<<<<<< HEAD
router.get('/allDeterminacion', getDeterminaciones);
=======
router.get('/determinacion', getDeterminaciones);
router.get('/determinacion/examen/:idExamen', getDeterminacionPorExamen);
>>>>>>> 71fceb5e07d241a9303f9d71fda1f76caabbef86
router.post('/determinacion', createDeterminacion);
router.put('/determinacion/:id', updateDeterminacion);
router.delete('/determinacion/:id', deleteDeterminacion);

export default router;
