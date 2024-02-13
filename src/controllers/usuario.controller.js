import { usuario } from '../models/usuario.js';

export const getUsuarios = async (req, res) => {
	try {
		const usuarios = await usuario.findAll();
		res.json(usuarios);
	} catch {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const getUsuario = async (req, res) => {
	try {
		const { id } = req.params;
		const usuario = await usuario.findOne({
			where: { id },
		});
		res.json(usuario);
	} catch {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const createUsuario = async (req, res) => {
	const { rol } = req.body;
	try {
		const newUsuario = await usuario.create({
			rol,
		});
		res.json(newUsuario);
	} catch {
		return res.status(500).json({
			message: error.message,
		});
	}
};


export const updateUsuario = async (req, res) => {
	const idUsuario = req.params;
	const { rol } = req.body;
	try {
		const updateUsuario = await usuario.findByPk(idUsuario);

		if (!updateUsuario) {
			return res.status(404).json({
				message: 'Usuario no encontrado',
			});
		}
		updateUsuario.rol = rol;

		await updateUsuario.save();
		res.json(updateUsuario);
	} catch {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const deleteUsuario = async (req, res) => {
	const idUsuario = req.params.id;
	try {
		await usuario.destroy({
			where: {idUsuario},
		});
		res.sendStatus(204);
	} catch {
		return res.status(500).json({
			message: error.message,
		});
	}
};
