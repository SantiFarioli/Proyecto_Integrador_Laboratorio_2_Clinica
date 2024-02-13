import { Router } from "express";
import { getBioquimicos, createBioquimico, updateBioquimico, deleteBioquimico } from "../controllers/bioquimico.controller.js";

const router = Router();

router.get('/bioquimicos', getBioquimicos);
router.post('/newbioquimico', createBioquimico);
router.put('/bioquimicoss/:id', updateBioquimico);
router.delete('/borrarbioquimico/:id', deleteBioquimico);

export default router;