import { paciente } from '../models/paciente.js';

export const getPacientes = async (req, res) => {
	try {
		const pacientes = await paciente.findAll();
		res.json(pacientes);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const createPaciente = async (req, res) => {
	const {
		nombre,
		apellido,
		dni,
		localidad,
		provincia,
		sexo,
		embarazo,
		fecha_nac,
		correo_electronico,
		telefono,
		obra_social,
		num_afiliado,
	} = req.body;

	try {
		const newPaciente = await paciente.create({
			nombre,
			apellido,
			dni,
			localidad,
			provincia,
			sexo,
			embarazo,
			fecha_nac,
			correo_electronico,
			telefono,
			obra_social,
			num_afiliado,
		});

		res.json(newPaciente);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const updatePaciente = async (req, res) => {};

export const deletePaciente = async (req, res) => {};
