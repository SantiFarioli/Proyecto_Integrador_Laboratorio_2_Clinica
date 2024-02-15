import { paciente } from '../models/paciente.js';
import { valor_referencia } from '../models/valor_referencia.js';
import { Op } from 'sequelize'; // Importa el operador de Sequelize

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

export const getPacientePorIdValorReferencia = async (req, res) => {
	try {
		const { id } = req.params;
		const pacienteEncontrado = await paciente.findByPk(id);
		if (!pacienteEncontrado) {
			return res.status(404).json({ message: 'Paciente no encontrado' });
		} else {
			const edad = calcularEdad(pacienteEncontrado.fecha_nac);
			console.log(edad);
			const sexo = pacienteEncontrado.sexo;
			const embarazo = pacienteEncontrado.embarazo ? 'Sí' : 'No'; // Ajusta según cómo esté almacenado en tu DB

			const valoresReferencia = await valor_referencia.findAll({
				where: {
					sexo: sexo,
					edadMinima: { [Op.lte]: edad },
					edadMaxima: { [Op.gte]: edad },
					embarazo: embarazo,
				},
			});

			res.json({
				paciente: pacienteEncontrado,
				valoresReferencia: valoresReferencia,
			});
		}
	} catch (error) {
		console.error(error); // Esto te dará más detalles sobre el error
		res.status(500).json({
			message: 'Error al obtener el paciente y sus valores de referencia',
			error: error.message, // Agregar el mensaje de error puede ayudarte a diagnosticar el problema
		});
	}
};

function calcularEdad(fechaNacimiento) {
	const hoy = new Date();
	const fechaNac = new Date(fechaNacimiento);
	let edad = hoy.getFullYear() - fechaNac.getFullYear();
	const m = hoy.getMonth() - fechaNac.getMonth();
	if (m < 0 || (m === 0 && hoy.getDate() < fechaNac.getDate())) {
		edad--;
	}
	return edad;
}

export const getPacientePorId = async (req, res) => {
	try {
		const { id } = req.params;
		const pacienteEncontrado = await paciente.findByPk(id);
		if (!pacienteEncontrado) {
			res.status(404).json({ message: 'Paciente no encontrado' });
		} else {
			res.json(pacienteEncontrado);
		}
	} catch (error) {
		res.status(500).json({ message: 'Error al obtener el paciente' });
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
			where: { idPaciente },
		});
		console.log(result);
		return res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};
