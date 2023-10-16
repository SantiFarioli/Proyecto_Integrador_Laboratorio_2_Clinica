import { Router } from 'express';
import {
	getPacientes,
	createPaciente,
	updatePaciente,
	searchPacientes,
	deletePaciente,
} from '../controllers/pacientes.controller.js';

const router = Router();

router.get('/pacientes', getPacientes);
router.get('/paciente', searchPacientes);
router.post('/pacientes', createPaciente);
router.put('/pacientes/actualizar/:id', updatePaciente);
router.delete('/pacientes/:id', deletePaciente);
router.get('/pacientes/:id');

export default router;
