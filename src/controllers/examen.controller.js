import {examen} from '../models/examen.js';

export const getExamen = async (req, res) => {
    try {
        const examenes = await examen.findAll();
        res.json(examenes);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const createExamen = async (req, res) => {
    const {
        codigo,
        descripcion,
        requisitosExamen,
        tiempoDeExamen
    } = req.body;
    try {
        const newExamen = await examen.create({
            codigo,
            descripcion,
            requisitosExamen,
            tiempoDeExamen
        });
        res.json(newExamen);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateExamen = async (req, res) => {
    const  idExamen  = req.params.id;
    const {
        codigo,
        descripcion,
        requisitosExamen,
        tiempoDeExamen
    } = req.body;
    try {
        const examenActualizado = await examen.findByPk(idExamen);
        if (!examenActualizado) {
            return res.status(404).json({
                message: 'Examen no encontrado',
            });
        }
        examenActualizado.codigo = codigo;
        examenActualizado.descripcion = descripcion;
        examenActualizado.requisitosExamen = requisitosExamen;
        examenActualizado.tiempoDeExamen = tiempoDeExamen;

        await examenActualizado.save();
        res.json(examenActualizado);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}

export const deleteExamen = async (req, res) => {
    const idExamen = req.params.id;
    try {
        const result = await examen.destroy({
            where: {idExamen}
        });
        console.log(result);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}