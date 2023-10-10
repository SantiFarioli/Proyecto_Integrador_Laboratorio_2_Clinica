import express from 'express';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import * as path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'));

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('inicio');
});

app.listen(port, () => {
	console.log(`Escuchando en el puerto ${port}`);
});
