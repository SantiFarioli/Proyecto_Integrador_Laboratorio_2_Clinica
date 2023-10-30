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

export const searchPacientes = async (req, res) => {
	const { criterio, valor } = req.query;

	try {
		let pacientes;

		if (criterio === 'dni') {
			pacientes = await paciente.findAll({
				where: {
					dni: valor,
				},
			});
		} else if (criterio === 'correo') {
			pacientes = await paciente.findAll({
				where: {
					correo_electronico: valor,
				},
			});
		} else if (criterio === 'telefono') {
			pacientes = await paciente.findAll({
				where: {
					telefono: valor,
				},
			});
		}

		res.json(pacientes);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const updatePaciente = async (req, res) => {
	const pacienteId = req.params.id; // Obtén el ID del paciente a actualizar
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
		// Encuentra al paciente por su ID
		const pacienteActualizado = await paciente.findByPk(pacienteId);

		if (!pacienteActualizado) {
			return res.status(404).json({
				message: 'Paciente no encontrado',
			});
		}

		// Actualiza los campos del paciente con los datos recibidos
		pacienteActualizado.nombre = nombre;
		pacienteActualizado.apellido = apellido;
		pacienteActualizado.dni = dni;
		pacienteActualizado.localidad = localidad;
		pacienteActualizado.provincia = provincia;
		pacienteActualizado.sexo = sexo;
		pacienteActualizado.embarazo = embarazo;
		pacienteActualizado.fecha_nac = fecha_nac;
		pacienteActualizado.correo_electronico = correo_electronico;
		pacienteActualizado.telefono = telefono;
		pacienteActualizado.obra_social = obra_social;
		pacienteActualizado.num_afiliado = num_afiliado;

		// Guarda los cambios en la base de datos
		await pacienteActualizado.save();

		return res.json(pacienteActualizado);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const deletePaciente = async (req, res) => {
	const idPaciente = req.params.id;
	try {
		const result = await paciente.destroy({
			where: {idPaciente}
		});
		console.log(result);
		return res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({
			message: error.message
		})
	}
};
