import {determinacion} from '../models/determinacion.js';

export const getDeterminaciones = async (req, res) => {
    try {
        const determinaciones = await determinacion.findAll();
        res.json(determinaciones);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const createDeterminacion = async (req, res) => {
    const {
        nombre,
        descripcion,
        unidadMedida,
        metodoAnalisis,
        idExamen
    } = req.body;
    try {
        const newDeterminacion = await determinacion.create({
            nombre,
            descripcion,
            unidadMedida,
            metodoAnalisis,
            idExamen
        });
        res.json(newDeterminacion);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}

export const updateDeterminacion = async (req, res) => {
    const  idDeterminacion  = req.params.id;
    const {
        nombre,
        descripcion,
        medida,
        metodoAnalisis
    } = req.body;

    try {
        const actualizarDeterminacion = await determinacion.findByPk(idDeterminacion);
        if (!actualizarDeterminacion) {
            return res.status(404).json({
                message: 'Determinacion no encontrada',
            });
        }
        actualizarDeterminacion.nombre = nombre;
        actualizarDeterminacion.descripcion = descripcion;
        actualizarDeterminacion.medida = medida;
        actualizarDeterminacion.metodoAnalisis = metodoAnalisis;

        await actualizarDeterminacion.save();

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

export const deleteDeterminacion = async (req, res) => {
    const  idDeterminacion  = req.params.id;
    try {
        const result = await determinacion.destroy({
            where: {idDeterminacion}
        });
        console.log(result);
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });
    }
}