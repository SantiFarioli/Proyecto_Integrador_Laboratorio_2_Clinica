import { Router } from 'express';
import {
	getExamenesYOrdenes,
	createExamenYOrden,
	updateExamenYOrden,
	deleteExamenYOrden,
} from '../controllers/examenes_y_ordenes.controller.js';

const router = Router();

router.get('/examenes-y-ordenes', getExamenesYOrdenes);
router.post('/examenes-y-ordenes', createExamenYOrden);
router.put('/examenes-y-ordenes/:id', updateExamenYOrden);
router.delete('/examenes-y-ordenes/:id', deleteExamenYOrden);

export default router;
