import { Router } from 'express';
import { getValorReferencia,
     createValorReferencia,
      updateValorReferencia,
       deleteValorReferencia } from '../controllers/valor_referencia.controller.js';

const router = Router();

router.get('/valorReferencia', getValorReferencia);
router.post('/valorReferencia', createValorReferencia);
router.put('/valorReferencia/:id', updateValorReferencia);
router.delete('/valorReferencia/:id', deleteValorReferencia);

export default router;