import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import bcrypt from 'bcrypt';
import { __dirname } from './utils.js';
import * as path from 'path';
import { main } from './index.js';
import pacienteRoutes from './router/paciente.ruta.js';
import muestraRequeridaRouter from './router/muestraRequerida.ruta.js';
import muestraRouter from './router/muestra.ruta.js';
import medicoRouter from './router/medico.ruta.js';
import ordenTrabajoRouter from './router/ordenTrabajo.ruta.js';
import examenRouter from './router/examen.ruta.js';
import examenesYOrdenesRoutes from './router/examenes_y_ordenes.ruta.js';
import determinacionRoutes from './router/determinacion.ruta.js';
import valorReferenciaRouter from './router/valor_referencia.ruta.js';
import recepcionistaRouter from './router/recepcionista.ruta.js';
import bioquimicoRouter from './router/bioquimico.ruta.js';
import tecnicoBioquimicoRouter from './router/tecnicoBioquimico.ruta.js';
import adminRouter from './router/admin.ruta.js';
import usuarioRouter from './router/usuario.ruta.js';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'));

app.use('/', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// Configuración de la sesión
app.use(
	session({
		secret: 'secretKey', // Cambia 'secretKey' por tu propia clave secreta
		resave: false,
		saveUninitialized: true,
	})
);

// Middleware para verificar si el usuario está autenticado
const checkAuth = (req, res, next) => {
	if (req.session.authenticated) {
		next();
	} else {
		res.redirect('/');
	}
};

// Modifica aquí para aplicar el middleware `checkAuth` a tus rutas protegidas
//app.use('/bioquimico', checkAuth, bioquimicoRouter);
//app.use('/admin', checkAuth, adminRouter);
//app.use('/tecnico', checkAuth, tecnicoBioquimicoRouter);
//app.use('/recepcionista', checkAuth, recepcionistaRouter);
// Aplica `checkAuth` a todas las demás rutas que requieran autenticación

async function buscarUsuarioPorEmail(email) {
	// Intenta encontrar el usuario en la tabla de administradores
	let usuario = await admin.findOne({ where: { correo: email } });
	if (usuario) return { usuario: usuario, rol: 'admin' };

	// Intenta encontrar el usuario en la tabla de bioquímicos
	usuario = await bioquimico.findOne({ where: { correo: email } });
	if (usuario) return { usuario: usuario, rol: 'bioquimico' };

	// Intenta encontrar el usuario en la tabla de técnicos bioquímicos
	usuario = await tecnicoBioquimico.findOne({ where: { correo: email } });
	if (usuario) return { usuario: usuario, rol: 'tecnicoBioquimico' };

	// Intenta encontrar el usuario en la tabla de recepcionistas
	usuario = await recepcionista.findOne({ where: { correo: email } });
	if (usuario) return { usuario: usuario, rol: 'recepcionista' };

	// Si no se encuentra el usuario, devuelve null
	return null;
}

app.post('/login', async (req, res) => {
	const { email, password } = req.body;
	const user = await buscarUsuarioPorEmail(email);

	if (user) {
		const match = await bcrypt.compare(password, user.contrasenia);
		if (match) {
			// Si las contraseñas coinciden, establece la sesión del usuario
			req.session.authenticated = true;
			req.session.user = { id: user.id, rol: user.rol };
			// Redirige al usuario según su rol
			res.redirect(`/${user.rol}`);
		} else {
			// Si la contraseña no coincide, envía un mensaje de error
			res.send('Credenciales incorrectas');
		}
	} else {
		res.send('Usuario no encontrado');
	}
});

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
app.use(muestraRouter);
app.use(ordenTrabajoRouter);
app.use(medicoRouter);
app.use(examenRouter);
app.use(examenesYOrdenesRoutes);
app.use(determinacionRoutes);
app.use(valorReferenciaRouter);
app.use(recepcionistaRouter);
app.use(bioquimicoRouter);
app.use(tecnicoBioquimicoRouter);
app.use(adminRouter);
app.use(usuarioRouter);

export default app;
main();
