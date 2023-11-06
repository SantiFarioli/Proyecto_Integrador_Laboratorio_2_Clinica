import { Router } from "express";
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.get('/admin', getAdmins);
router.post('/admin', createAdmin);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);

export default router;