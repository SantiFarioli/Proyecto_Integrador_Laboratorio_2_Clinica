import express from 'express';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import * as path from 'path';
import { main } from './index.js';
import pacienteRoutes from './router/paciente.ruta.js';
import muestraRequeridaRouter from './router/muestraRequerida.ruta.js';
import medicoRouter from './router/medico.ruta.js';
import ordenTrabajoRouter from './router/ordenTrabajo.ruta.js';
import examenRouter from './router/examen.ruta.js';
const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'));

app.use('/', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Ruta de inicio (login)
app.get('/', (req, res) => {
	// Marca la variable isLoginPage como verdadera cuando estás en la página de inicio.
	res.render('loginPersonalLab', { isLoginPage: true });
});

// Rutas para diferentes tipos de usuarios
app.use('/bioquimico', (req, res) => {
	// Establecer la variable isBioquimico en true para la vista
	res.render('bioquimico', { isBioquimico: true });
});

app.use('/admin', (req, res) => {
	// Establecer la variable isAdmin en true para la vista
	res.render('admin', { isAdmin: true });
});

app.use('/tecnico', (req, res) => {
	// Establecer la variable isTecnico en true para la vista
	res.render('tecnico', { isTecnico: true });
});

app.use('/recepcionista', (req, res) => {
	// Establecer la variable isRecepcionista en true para la vista
	res.render('recepcionista', { isRecepcionista: true });
});

app.use(pacienteRoutes);
app.use(muestraRequeridaRouter);
app.use(ordenTrabajoRouter);
app.use(medicoRouter);
app.use(examenRouter);
export default app;
main();
