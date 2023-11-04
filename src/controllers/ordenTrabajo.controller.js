import { medico } from '../models/medico.js';
import { orden_trabajo } from '../models/orden_trabajo.js';
import { paciente } from '../models/paciente.js';

export const getOrdenesTrabajo = async (req, res) => {
	try {
		const ordenesTrabajo = await orden_trabajo.findAll({
			include: [
				{
					model: paciente,
					as: 'paciente',
					attributes: ['apellido'],
				},
				{
					model: paciente,
					as: 'paciente',
					attributes: ['dni'],
				},
				{
					model: medico,
					as: 'medico',
					attributes: ['nombre'],
				},
			],
		});

		res.json(ordenesTrabajo);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const getOrdenesTrabajoTrue = async (req, res) => {
	try {
		const ordenesTrabajo = await orden_trabajo.findAll({
			where: {
				cancelada: true,
			},
			include: [
				{
					model: paciente,
					as: 'paciente',
					attributes: ['apellido'],
				},
				{
					model: paciente,
					as: 'paciente',
					attributes: ['dni'],
				},
				{
					model: medico,
					as: 'medico',
					attributes: ['nombre'],
				},
			],
		});

		res.json(ordenesTrabajo);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const getOrdenesTrabajoFalse = async (req, res) => {
	try {
		const ordenesTrabajo = await orden_trabajo.findAll({
			where: {
				cancelada: false,
			},
			include: [
				{
					model: paciente,
					as: 'paciente',
					attributes: ['apellido'],
				},
				{
					model: paciente,
					as: 'paciente',
					attributes: ['dni'],
				},
				{
					model: medico,
					as: 'medico',
					attributes: ['nombre'],
				},
			],
		});

		res.json(ordenesTrabajo);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const createOrdenTrabajo = async (req, res) => {
	const {
		fechaCreacion,
		estado,
		diagnostico,
		cancelada,
		idPaciente,
		idMedico,
	} = req.body;

	try {
		const nuevaOrdenTrabajo = await orden_trabajo.create({
			fechaCreacion,
			estado,
			diagnostico,
			cancelada,
			idPaciente,
			idMedico,
		});

		res.json(nuevaOrdenTrabajo);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al crear la orden de trabajo' });
	}
};

// Actualizar una orden de trabajo existente
export const updateOrdenesTrabajo = async (req, res) => {
	const { id } = req.params;
	const {
		fechaCreacion,
		estado,
		diagnostico,
		cancelada,
		pacienteId,
		medicoId,
	} = req.body;

	try {
		const ordenTrabajo = await orden_trabajo.findByPk(id);
		if (!ordenTrabajo) {
			return res
				.status(404)
				.json({ message: 'Orden de trabajo no encontrada' });
		}

		ordenTrabajo.fechaCreacion = fechaCreacion;
		ordenTrabajo.estado = estado;
		ordenTrabajo.diagnostico = diagnostico;
		ordenTrabajo.cancelada = cancelada;
		ordenTrabajo.pacienteId = pacienteId;
		ordenTrabajo.medicoId = medicoId;

		await ordenTrabajo.save();

		res.json({ message: 'Orden de trabajo actualizada con éxito' });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'Error al actualizar la orden de trabajo' });
	}
};

export const cacelarOrdenesTrabajo = async (req, res) => {
	const { id } = req.params;
	const { cancelada } = req.body;

	try {
		const ordenTrabajo = await orden_trabajo.findByPk(id);
		if (!ordenTrabajo) {
			return res
				.status(404)
				.json({ message: 'Orden de trabajo no encontrada' });
		}
		ordenTrabajo.cancelada = cancelada;

		await ordenTrabajo.save();

		res.json({ message: 'Orden de trabajo actualizada con éxito' });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ message: 'Error al actualizar la orden de trabajo' });
	}
};

// Eliminar una orden de trabajo por su ID
export const deleteOrdenesTrabajo = async (req, res) => {
	const { id } = req.params;

	try {
		const ordenTrabajo = await orden_trabajo.findByPk(id);
		if (!ordenTrabajo) {
			return res
				.status(404)
				.json({ message: 'Orden de trabajo no encontrada' });
		}

		await ordenTrabajo.destroy();

		res.json({ message: 'Orden de trabajo eliminada con éxito' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al eliminar la orden de trabajo' });
	}
};
