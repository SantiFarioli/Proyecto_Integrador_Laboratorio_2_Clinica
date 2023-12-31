import { recepcionista } from '../models/recepcionista.js';

export const getRecepcionistas = async (req, res) => {
	try {
		const recepcionistas = await recepcionista.findAll();
		res.json(recepcionistas);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

export const createRecepcionista = async (req, res) => {
	const {
		nombre,
		apellido,
		dni,
		telefono,
		correo,
		usuarioIdUsuario, // Recibes el ID del usuario creado
	} = req.body;

	try {
		const newRecepcionista = await recepcionista.create({
			nombre,
			apellido,
			dni,
			telefono,
			correo,
			usuarioIdUsuario,
		});

		res.json(newRecepcionista);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const updateRecepcionista = async (req, res) => {
	const idRecepcionista = req.params.id;

	const { nombre, apellido, dni, telefono, correo } = req.body;

	try {
		const updateRecepcionista = await recepcionista.findByPk(idRecepcionista);

		if (!updateRecepcionista) {
			res.status(404).json({
				message: 'Recepcionista no encontrado',
			});
		}
		updateRecepcionista.nombre = nombre;
		updateRecepcionista.apellido = apellido;
		updateRecepcionista.dni = dni;
		updateRecepcionista.telefono = telefono;
		updateRecepcionista.correo = correo;

		await updateRecepcionista.save();
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
};

export const deleteRecepcionista = async (req, res) => {
	const idRecepcionista = req.params.id;
	try {
		const result = await recepcionista.destroy({
			where: { idRecepcionista },
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
