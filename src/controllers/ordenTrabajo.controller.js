import { medico } from "../models/medico.js";
import { orden_trabajo } from "../models/orden_trabajo.js";
import { paciente } from "../models/paciente.js";

export const getOrdenesTrabajo = async (req, res) => {
    try {
        const ordenesTrabajo = await orden_trabajo.findAll({
            include: [
                {
                    model: paciente,
                    as: 'paciente',
                    attributes: ['nombre'],
                },
                { 
                    model: medico,
                    as: 'medico',
                    attributes: ['nombre']
                }
            ]
        });
        
        res.json(ordenesTrabajo);
        }  catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}