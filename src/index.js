import { sequelize } from './database/database.js';
import app from './app.js';
const port = process.env.PORT || 3000;

import './models/paciente.js';
import './models/orden_trabajo.js';
import './models/medico.js';
import './models/valor_referencia.js';
import './models/determinacion.js';
import './models/examen.js';
import './models/muestraRequerida.js';
import './models/muestra.js';
import './models/bioquimico.js';
import './models/usuario.js';
import './models/resultado.js';
import './models/auditoria.js';
import './models/examenes_y_ordenes.js';
import './models/recepcionista.js';
import './models/tecnicoBioquimico.js';
import './models/admin.js';
import './models/usuarioPaciente.js';

export async function main() {
	try {
		await sequelize.sync({ alert: true });
		console.log('conexion establecida con exito');
		app.listen(port, () => {
			console.log(`Escuchando en el puerto ${port}`);
		});
	} catch (error) {
		console.log('No se puede establecer la conexion a la base de datos', error);
	}
}
