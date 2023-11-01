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
		const { ordenTrabajoId, examenId } = req.body;

		// Verificar si la asociación ya existe en la base de datos
		const asociacionExistente = await examenes_y_ordenes.findOne({
			where: { ordenTrabajoId, examenId },
		});

		if (asociacionExistente) {
			return res.status(400).json({ message: 'La asociación ya existe.' });
		}

		// Crear una nueva asociación entre orden de trabajo y examen
		const nuevaAsociacion = await examenes_y_ordenes.create({
			ordenTrabajoId,
			examenId,
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
