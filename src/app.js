import express from 'express';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import * as path from 'path';
import { sequelize } from './database/database.js';

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'));

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	// Marca la variable isLoginPage como falsa cuando estás en la página de inicio.
	res.render('inicio', { isLoginPage: false });
});

app.get('/login', (req, res) => {
	// Marca la variable isLoginPage como verdadera cuando estás en la página de inicio de sesión.
	res.render('loginPersonalLab', { isLoginPage: true });
});

import './models/paciente.js';
import './models/orden_trabajo.js';
import './models/medico.js';
import './models/valor_referencia.js';
import './models/determinacion.js';
import './models/examen.js';
import './models/muestra.js';
import './models/bioquimico.js';
import './models/usuario.js';
import './models/resultado.js';
import './models/auditoria.js';
async function main() {
	try {
		await sequelize.sync({ force: true });
		console.log('conexion establecida con exito');
		app.listen(port, () => {
			console.log(`Escuchando en el puerto ${port}`);
		});
	} catch (error) {
		console.log('No se puede establecer la conexion a la base de datos', error);
	}
}
main();
