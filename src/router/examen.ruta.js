import { Router } from 'express';
import {
	getExamen,
	createExamen,
	updateExamen,
	deleteExamen,
} from '../controllers/examen.controller.js';

const router = Router();

router.get('/examen', getExamen);
router.post('/examen', createExamen);
router.put('/examen/:id', updateExamen);
router.delete('/examen/:id', deleteExamen);

export default router;
