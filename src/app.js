import express from 'express';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import * as path from 'path';
import { main } from './index.js';


const app = express();

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


export default app;
main();