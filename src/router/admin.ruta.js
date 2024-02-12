import { Router } from "express";
import { getAdmins, createAdmin, updateAdmin, deleteAdmin } from "../controllers/admin.controller.js";

const router = Router();

router.get('/alladmins', getAdmins);
router.post('/newAdmin', createAdmin);
router.put('/admin/:id', updateAdmin);
router.delete('/admin/:id', deleteAdmin);

export default router;