import { Router } from 'express';
import {
	getPacientes,
	createPaciente,
	updatePaciente,
	searchPacientes,
	deletePaciente,
	getPacientePorId,
	getPacientePorIdValorReferencia,
} from '../controllers/pacientes.controller.js';

const router = Router();

router.get('/pacientes', getPacientes);
router.get('/paciente', searchPacientes);
router.get('/pacienteid/:id', getPacientePorId);
router.get('/pacienteVslorRef/:id', getPacientePorIdValorReferencia);
router.post('/pacientes', createPaciente);
router.put('/pacientes/actualizar/:id', updatePaciente);
router.delete('/pacientes/:id', deletePaciente);

export default router;
