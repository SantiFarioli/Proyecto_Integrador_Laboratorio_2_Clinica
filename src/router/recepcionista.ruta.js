import { Router } from 'express';
import {
	getRecepcionistas,
	createRecepcionista,
	updateRecepcionista,
	deleteRecepcionista,
} from '../controllers/recepcionista.controller.js';

const router = Router();

router.get('/recepcionistas', getRecepcionistas);
router.post('/newrecepcionista', createRecepcionista);
router.put('/recepcionista/:id', updateRecepcionista);
router.delete('/recepcionista/:id', deleteRecepcionista);

export default router;
