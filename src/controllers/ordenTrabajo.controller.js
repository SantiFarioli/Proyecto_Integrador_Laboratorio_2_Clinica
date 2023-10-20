import { orden_trabajo } from "../models/orden_trabajo.js";

export const getOrdenesTrabajo = async (req, res) => {
    try {
        const ordenesTrabajo = await orden_trabajo.findAll();
        console.log(ordenesTrabajo);
        res.json(ordenesTrabajo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}