import { Router } from 'express';
import {
	getOrdenesTrabajo,
	createOrdenTrabajo,
	updateOrdenesTrabajo,
	deleteOrdenesTrabajo,
} from '../controllers/ordenTrabajo.controller.js';

const router = Router();

router.get('/ordenTrabajo', getOrdenesTrabajo);
router.post('/orden-trabajo', createOrdenTrabajo);
router.put('/orden-trabajo/:id', updateOrdenesTrabajo);
router.delete('/orden-trabajo/:id', deleteOrdenesTrabajo);

export default router;
