import { Router } from 'express';
import {
	getRecepcionistas,
	createRecepcionista,
	updateRecepcionista,
	deleteRecepcionista,
} from '../controllers/recepcionista.controller.js';

const router = Router();

router.get('/recepcionistas', getRecepcionistas);
router.post('/newRecepcionista', createRecepcionista);
router.put('/actualizarRecepcionista/:id', updateRecepcionista);
router.delete('/borrarRecepcionista/:id', deleteRecepcionista);

export default router;
