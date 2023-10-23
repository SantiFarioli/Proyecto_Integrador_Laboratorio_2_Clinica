import {Router} from 'express';
import {getExamen, createExamen, updateExamen, deleteExamen} from '../controllers/exmane.controller.js';

const router = Router();

router.get('/exmane', getExamen);   
router.post('/exmane', createExamen);
router.put('/exmane/:id', updateExamen);
router.delete('/exmane/:id', deleteExamen);

export default router;