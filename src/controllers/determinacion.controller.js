import { determinacion } from '../models/determinacion.js';

export const getDeterminaciones = async (req, res) => {
	try {
		const determinaciones = await determinacion.findAll();
		res.json(determinaciones);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const getDeterminacionPorExamen = async (req, res) => {
	try {
		const { idExamen } = req.params;
		const determinaciones = await determinacion.findAll({
			where: { idExamen },
		});
		if (determinaciones.length > 0) {
			res.json(determinaciones);
		} else {
			res
				.status(404)
				.json({
					message:
						'No se encontraron determinaciones para el examen proporcionado.',
				});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: 'Error al obtener las determinaciones por idExamen',
			error: error.message,
		});
	}
>>>>>>> 71fceb5e07d241a9303f9d71fda1f76caabbef86
};

export const createDeterminacion = async (req, res) => {
	const { nombre, descripcion, unidadMedida, metodoAnalisis, idExamen } =
		req.body;
	try {
		const newDeterminacion = await determinacion.create({
			nombre,
			descripcion,
			unidadMedida,
			metodoAnalisis,
			idExamen,
		});
		res.json(newDeterminacion);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const updateDeterminacion = async (req, res) => {
	const idDeterminacion = req.params.id;
	const { nombre, descripcion, unidadMedida, metodoAnalisis, idExamen } =
		req.body;

	try {
		const actualizarDeterminacion = await determinacion.findByPk(
			idDeterminacion
		);

		if (!actualizarDeterminacion) {
			return res.status(404).json({
				message: 'Determinacion no encontrada',
			});
		}
		actualizarDeterminacion.nombre = nombre;
		actualizarDeterminacion.descripcion = descripcion;
		actualizarDeterminacion.unidadMedida = unidadMedida;
		actualizarDeterminacion.metodoAnalisis = metodoAnalisis;
		actualizarDeterminacion.idExamen = idExamen;

		await actualizarDeterminacion.save();
		res.json(actualizarDeterminacion);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const deleteDeterminacion = async (req, res) => {
	const idDeterminacion = req.params.id;
	try {
		const result = await determinacion.destroy({
			where: { idDeterminacion },
		});
		console.log(result);
		return res.sendStatus(204);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: error.message,
		});
	}
};
