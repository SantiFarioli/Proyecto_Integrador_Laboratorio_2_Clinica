import { Router } from "express";
import { getTecnicoBioquimico, createTecnicoBioquimico, updateTecnicoBioquimico, deleteTecnicoBioquimico } from "../controllers/tecnicoBioquimico.controller.js";

const router = Router();

router.get('/tecnicosBioquimicos', getTecnicoBioquimico);
router.post('/newtecnicoBioquimico', createTecnicoBioquimico);
router.put('/actualizarTecnicoBioquimico/:id', updateTecnicoBioquimico);
router.delete('/borrarTecnicoBioquimico/:id', deleteTecnicoBioquimico);

export default router;