import { Router } from 'express';
import {
	getExamenesYOrdenes,
	createExamenYOrden,
	updateExamenYOrden,
	deleteExamenYOrden,
	getExamenesPorOrdenTrabajo, // Asegúrate de importar tu nueva función del controlador
} from '../controllers/examenes_y_ordenes.controller.js';

const router = Router();

router.get('/examenes-y-ordenesAll', getExamenesYOrdenes);
router.post('/examenes-y-ordenes', createExamenYOrden);
router.put('/examenes-y-ordenes/:id', updateExamenYOrden);
router.delete('/examenes-y-ordenes/:id', deleteExamenYOrden);
router.get(
	'/examenes-y-ordenes/paciente/:idOrdenTrabajo',
	getExamenesPorOrdenTrabajo
);

export default router;
