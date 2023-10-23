import { muestra } from '../models/muestra.js';


export const getMuestras = async (req, res) => {
    try {
        const muestras = await muestra.findAll();
        res.json(muestras);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });   
    }   
};


export const createMuestra = async (req, res) => {
    const {
        tipo,
        fechaRecepcion,
        etiqueta,
        idOrdenTrabajo
    } = req.body;
    
    try {
        const newMuestra = await muestra.create({
            tipo,
            fechaRecepcion,
            etiqueta,
            idOrdenTrabajo
        });
    
        res.json(newMuestra);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
    
};

export const updateMuestra = (req, res) => {
    const { idMuestra } = req.params;
    const {
        tipo,
        fechaRecepcion,
        etiqueta,
        idOrdenTrabajo
    } = req.body;
    
    try {
        const updatedMuestra = muestra.update({
            tipo,
            fechaRecepcion,
            etiqueta,
            idOrdenTrabajo
        }, {
            where: {idMuestra}
        });
        res.json(updatedMuestra);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
};

export const deleteMuestra = async(req, res) => {
    const { idMuestra } = req.params;
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
