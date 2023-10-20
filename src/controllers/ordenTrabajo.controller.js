import { orden_trabajo } from "../models/orden_trabajo.js";

export const getOrdenesTrabajo = async (req, res) => {
    try {
        const ordenesTrabajo = await orden_trabajo.findAll();
        res.json(ordenesTrabajo);
    } catch (error) {
        return res.status(500).json({
            message: error.message,
        });
    }
}