import {Router} from 'express';
import {getUsuarios, createUsuario, updateUsuario, deleteUsuario} from "../controllers/usuario.controller.js";

const router = Router();

router.get('/usuarios', getUsuarios);
router.post('/usuario', createUsuario);
router.put('/usuarioss/:id', updateUsuario);
router.delete('/eliminarusuario/:id', deleteUsuario);

export default router