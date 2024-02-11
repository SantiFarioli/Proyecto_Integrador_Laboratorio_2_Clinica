import bcrypt from 'bcrypt';
import {tecnicoBioquimico} from '../models/tecnicoBioquimico.js';

export const getTecnicoBioquimico = async (req, res) => {
    try {
        const tecnicoBioquimico = await tecnicoBioquimico.findAll();
        res.json(tecnicoBioquimico);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export const createTecnicoBioquimico = async (req, res) => {
    const {
        nombre,
        apellido,
        dni,
        telefono,
        correo,
        contrasenia,
        idUsuario
    } = req.body;
    try {
        const contrasenaHash = await bcrypt.hash(contrasenia, 10);

        const newTecnicoBioquimico = await tecnicoBioquimico.create({
            nombre,
            apellido,
            dni,
            telefono,
            correo,
            contrasenia: contrasenaHash,
            idUsuario
        });
        res.json(newTecnicoBioquimico);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateTecnicoBioquimico = async (req, res) => {
    const idTecnicoBioquimico = req.params.id;
    const {
        nombre,
        apellido,
        dni,
        telefono,
        correo,
        contrasenia
    } = req.body;
    try {
        const actualizarTecnicoBioquimico = await tecnicoBioquimico.findByPk(idTecnicoBioquimico);
        if (!actualizarTecnicoBioquimico) {
            return res.status(404).json({
                message: 'TecnicoBioquimico no encontrado'
            });
        };
    

    actualizarTecnicoBioquimico.nombre = nombre;
    actualizarTecnicoBioquimico.apellido = apellido;
    actualizarTecnicoBioquimico.dni = dni;
    actualizarTecnicoBioquimico.telefono = telefono;
    actualizarTecnicoBioquimico.correo = correo;
    actualizarTecnicoBioquimico.contrasenia = contrasenia;

    await actualizarTecnicoBioquimico.save();
    res.json(actualizarTecnicoBioquimico);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const deleteTecnicoBioquimico = async (req, res) => {
    const idTecnicoBioquimico = req.params.id;
    try {
        const result = await tecnicoBioquimico.destroy({
            where: { idTecnicoBioquimico }
        });
        console.log(result);
        return res.sendStatus(204);
    }catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}
