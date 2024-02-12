import { Router } from "express";
import { getBioquimicos, createBioquimico, updateBioquimico, deleteBioquimico } from "../controllers/bioquimico.controller.js";

const router = Router();

router.get('/bioquimicos', getBioquimicos);
router.post('/newbioquimico', createBioquimico);
router.put('/bioquimico/:id', updateBioquimico);
router.delete('/bioquimico/:id', deleteBioquimico);

export default router;