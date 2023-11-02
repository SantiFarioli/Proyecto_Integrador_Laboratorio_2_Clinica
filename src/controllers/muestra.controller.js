import { muestra } from '../models/muestra.js';

export const getMuestras = async (req, res) => {
	try {
		const muestras = await muestra.findAll();
		res.json(muestras);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const createMuestra = async (req, res) => {
	const { tipo, descripcion, idExamen } = req.body;

	try {
		const muestraNueva = await muestra.create({
			tipo,
			descripcion,
			idExamen,
		});

		res.json(muestraNueva);
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const updateMuestra = async (req, res) => {
	const idMuestra = req.params.id;
	const { tipo, descripcion, idExamen } = req.body;

	try {
		const actualizarMuestra = await muestra.findByPk(idMuestra);
		if (!actualizarMuestra) {
			return res.status(404).json({
				message: 'Muestra no encontrada',
			});
		}
		actualizarMuestra.tipo = tipo;
		actualizarMuestra.descripcion = descripcion;
		actualizarMuestra.idExamen = idExamen;

		await res.json(actualizarMuestra);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const deleteMuestra = async (req, res) => {
	const idMuestra = req.params;

	try {
		const result = await muestra.destroy({
			where: { idMuestra },
		});
		console.log(result);
		return res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({
			message: error.message,
		});
	}
};

export const getTipoMuestraPorIdExamen = async (req, res) => {
	const idExamen = req.query.idExamen; // Obtén el idExamen de la solicitud

	try {
		// Consulta la base de datos para obtener el tipo de muestra según el idExamen
		const muestraData = await muestra.findOne({ where: { idExamen } });

		if (muestraData) {
			// Si se encuentra el tipo de muestra, devuélvelo como respuesta
			res.json({ tipo: muestraData.tipo });
		} else {
			// Si no se encuentra, devuelve un mensaje de error o un valor predeterminado
			res.status(404).json({ message: 'Tipo de muestra no encontrado' });
		}
	} catch (error) {
		console.error('Error al obtener el tipo de muestra:', error);
		res.status(500).json({ message: 'Error al obtener el tipo de muestra' });
	}
};
