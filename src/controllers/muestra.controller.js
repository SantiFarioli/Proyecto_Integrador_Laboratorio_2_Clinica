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
    
};

export const deleteMuestra = (req, res) => {
    
};
