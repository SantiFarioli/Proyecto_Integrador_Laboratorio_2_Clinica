import { Router } from 'express';
import {
	getMedico,
	createMedico,
	updateMedico,
	deleteMedico,
} from '../controllers/medico.controller.js';

const router = Router();

router.get('/medico', getMedico);
router.post('/medico', createMedico);
router.put('/medico/:id', updateMedico);
router.delete('/medico/:id', deleteMedico);

export default router;
