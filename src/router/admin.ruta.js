import { Router } from "express";
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.get('/alladmins', getAdmins);
router.post('/newAdmin', createAdmin);
router.put('/actualizarAdmin/:id', updateAdmin);
router.delete('/borrarAdmin/:id', deleteAdmin);

export default router;