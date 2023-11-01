import { medico } from '../models/medico.js';

export const getMedico = async (req, res) => {
	try {
		const medicos = await medicos.findAll();
		res.json(medicos);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const createMedico = async (req, res) => {
	const { nombre, apellido, dni, especialidad, telefono, correo, direccion } =
		req.body;

	try {
		const nuevoMedico = await medico.create({
			nombre,
			apellido,
			dni,
			especialidad,
			telefono,
			correo,
			direccion,
		});

		// El ID del médico creado se encuentra en nuevoMedico.id
		const medicoId = nuevoMedico.id;

		res.status(201).json({ id: medicoId });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Error al crear el médico' });
	}
};

export const updateMedico = (req, res) => {};

export const deleteMedico = (req, res) => {};
