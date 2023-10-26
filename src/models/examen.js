import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { determinacion } from './determinacion.js';
import { muestra } from './muestra.js';

export const examen = sequelize.define('examenes', {
	idExamen: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	descripcion: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

examen.hasMany(determinacion, {
	foreignKey: 'idExamen',
	surceKey: 'idExamen',
});

determinacion.belongsTo(examen, {
	foreignKey: 'idExamen',
	targetKey: 'idExamen',
});

muestra.belongsTo(examen, {
	foreignKey: 'idExamen',
	targetKey: 'idExamen',
});
