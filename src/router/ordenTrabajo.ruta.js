import { Router } from 'express';
import {
	getOrdenesTrabajo,
	createOrdenTrabajo,
	updateOrdenesTrabajo,
	deleteOrdenesTrabajo,
	getOrdenesTrabajoTrue,
	cacelarOrdenesTrabajo,
	getOrdenesTrabajoFalse,
} from '../controllers/ordenTrabajo.controller.js';

const router = Router();

router.get('/ordenTrabajo', getOrdenesTrabajo);
router.get('/ordenTrabajoTrue', getOrdenesTrabajoTrue);
router.get('/ordenTrabajoFalse', getOrdenesTrabajoFalse);
router.post('/orden-trabajo', createOrdenTrabajo);
router.put('/orden-trabajo/:id', updateOrdenesTrabajo);
router.put('/orden-trabajo-cacelar/:id', cacelarOrdenesTrabajo);
router.delete('/orden-trabajo/:id', deleteOrdenesTrabajo);

export default router;
