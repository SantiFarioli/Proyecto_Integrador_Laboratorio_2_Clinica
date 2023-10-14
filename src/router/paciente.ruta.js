import { Router } from "express";
import {getPacientes, createPaciente} from '../controllers/pacientes.controller.js'

const router = Router();

router.get('/pacientes', getPacientes);
router.post('/pacientes', createPaciente);
router.put('/pacientes/:id')
router.delete('/pacientes/:id')
router.get('/pacientes/:id')


export default router