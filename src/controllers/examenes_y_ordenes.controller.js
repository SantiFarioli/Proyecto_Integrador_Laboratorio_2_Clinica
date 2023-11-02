import { examenes_y_ordenes } from '../models/examenes_y_ordenes.js';

export const getExamenesYOrdenes = async (req, res) => {
	try {
		const examenesYOrdenes = await examenes_y_ordenes.findAll();
		res.json(examenesYOrdenes);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const createExamenYOrden = async (req, res) => {
	try {
		const { idOrdenTrabajo, idExamen } = req.body;

		// Crear una nueva asociación entre orden de trabajo y examen
		const nuevaAsociacion = await examenes_y_ordenes.create({
			idOrdenTrabajo,
			idExamen,
		});

		res.status(201).json(nuevaAsociacion);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const updateExamenYOrden = (req, res) => {
	// Lógica para actualizar un registro de examenes_y_ordenes
};

export const deleteExamenYOrden = async (req, res) => {
	try {
		const { id } = req.params;

		// Eliminar la asociación entre orden de trabajo y examen
		const resultado = await examenes_y_ordenes.destroy({
			where: { id },
		});

		if (resultado === 1) {
			res.json({ message: 'Asociación eliminada con éxito.' });
		} else {
			res.status(404).json({ message: 'Asociación no encontrada.' });
		}
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};
