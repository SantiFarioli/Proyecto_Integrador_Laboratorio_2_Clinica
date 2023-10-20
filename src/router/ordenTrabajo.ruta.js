import { Router } from "express";
import { getOrdenesTrabajo} from "../controllers/ordenTrabajo.controller.js";

const router = Router();

router.get('/ordenTrabajo', getOrdenesTrabajo);

export default router;