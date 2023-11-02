import {muestra} from '../models/muestra.js'

export const getMuestras = async (req, res) =>{
    try {
        const muestras = await muestra.findAll();
        res.json(muestras);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const createMuestra = async (req, res) => {
    const {
        tipo,
        descripcion,
        idExamen
    } = req.body;

    try {
        const muestraNueva = await muestra.create({
            tipo,
          descripcion,
            idExamen
        });

        res.json(muestraNueva);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        });        
    }
};

export const updateMuestra = async (req, res) => {
    const  idMuestra  = req.params.id;
    const {
        tipo,
        descripcion,
        idExamen
    } = req.body;

    try {
        const actualizarMuestra = await muestra.findByPk(idMuestra);
        if (!actualizarMuestra) {
            return res.status(404).json({
                message: 'Muestra no encontrada',
            });
        }
        actualizarMuestra.tipo = tipo;
        actualizarMuestra.descripcion = descripcion;
        actualizarMuestra.idExamen = idExamen;

        await res.json(actualizarMuestra);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

export const deleteMuestra = async (req, res) => {
    const  idMuestra  = req.params;

    try {
        const result = await muestra.destroy({
            where: {idMuestra}
        });
        console.log(result);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};