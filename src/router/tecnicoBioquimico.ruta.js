import { Router } from "express";
import { getTecnicoBioquimico, createTecnicoBioquimico, updateTecnicoBioquimico, deleteTecnicoBioquimico } from "../controllers/tecnicoBioquimico.controller.js";

const router = Router();

router.get('/tecnicoBioquimico', getTecnicoBioquimico);
router.post('/tecnicoBioquimico', createTecnicoBioquimico);
router.put('/tecnicoBioquimico/:id', updateTecnicoBioquimico);
router.delete('/tecnicoBioquimico/:id', deleteTecnicoBioquimico);

export default router;