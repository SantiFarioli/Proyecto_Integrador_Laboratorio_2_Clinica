import express from 'express';
import { engine } from 'express-handlebars';
import { __dirname } from './utils.js';
import * as path from 'path';
import {sequelize} from './database/database.js';

const app = express();
const port = process.env.PORT || 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.resolve(__dirname + '/views'));

app.use('/', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('inicio');
});

async function main() {
    try {
        await sequelize.authenticate();
        console.log('conexion establecida con exito');
		app.listen(port, () => {
			console.log(`Escuchando en el puerto ${port}`);
		});
    } catch (error) {
        console.log('No se puede establecer la conexion a la base de datos', error);
    }
}
 main();
