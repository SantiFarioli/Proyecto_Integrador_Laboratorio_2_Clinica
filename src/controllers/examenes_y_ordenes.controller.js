import { examenes_y_ordenes } from '../models/examenes_y_ordenes.js';
import { examen } from '../models/examen.js';
import { orden_trabajo } from '../models/orden_trabajo.js';

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

// Función para obtener los exámenes y órdenes por ID de paciente
export const getExamenesPorOrdenTrabajo = async (req, res) => {
	try {
		const { idOrdenTrabajo } = req.params;
		const ordenTrabajoConExamenes = await orden_trabajo.findByPk(
			idOrdenTrabajo,
			{
				include: [
					{
						model: examen,
						through: {
							model: examenes_y_ordenes,
							as: 'examenesAsociados', // Este 'as' debe coincidir con el definido en tus modelos
						},
					},
				],
			}
		);

		if (!ordenTrabajoConExamenes) {
			return res.status(404).json({
				message: 'Orden de trabajo no encontrada o sin exámenes asociados.',
			});
		}

		res.json(ordenTrabajoConExamenes.examenes); // Ajustar esto para que coincida con la estructura de datos que devuelve Sequelize
	} catch (error) {
		res
			.status(500)
			.json({ message: 'Error al obtener los exámenes: ' + error.message });
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
