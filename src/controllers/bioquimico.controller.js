import {bioquimico} from '../models/bioquimico.js';

export const getBioquimicos = async (req, res) => {
    try {
        const bioquimicos = await bioquimico.findAll();
        res.json(bioquimicos);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const createBioquimico = async (req, res) => {
    const {
        nombre,
        apellido,
        dni,
        telefono,
        correo,
        especialidad
    } = req.body;
    try {
        const newBioquimico = await bioquimico.create({
            nombre,
            apellido,
            dni,
            telefono,
            correo,
            especialidad
        });
        res.json(newBioquimico)
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateBioquimico = async (req, res) => {
    const idBioquimico  = req.params.id;
    const {
        nombre,
        apellido,
        dni,
        telefono,
        correo,
        especialidad
    } = req.body;
        
    try {
        const actualizarBioquimico = await bioquimico.findByPk(idBioquimico);
        if (!actualizarBioquimico) {
            return res.status(404).json({
                message: 'Bioquimico no encontrado'
            });
        }
        actualizarBioquimico.nombre = nombre;
        actualizarBioquimico.apellido = apellido;
        actualizarBioquimico.dni = dni;
        actualizarBioquimico.telefono = telefono;
        actualizarBioquimico.correo = correo;
        actualizarBioquimico.especialidad = especialidad;

        await actualizarBioquimico.save();
        res.json(actualizarBioquimico);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const deleteBioquimico = async (req, res) => {
    const idBioquimico = req.params.id;
    try {
        const result = await bioquimico.destroy({
            where: {idBioquimico}
        });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}