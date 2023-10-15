import { Router } from 'express';
import {
	getPacientes,
	createPaciente,
	updatePaciente,
	deletePaciente,
} from '../controllers/pacientes.controller.js';

const router = Router();

router.get('/pacientes', getPacientes);
router.post('/pacientes', createPaciente);
router.put('/pacientes/:id', updatePaciente);
router.delete('/pacientes/:id', deletePaciente);
router.get('/pacientes/:id');

export default router;
