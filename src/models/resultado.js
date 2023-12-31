import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const resultado = sequelize.define('resultados', {
	idResultado: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	tipo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	fechaRecepcion: {
		type: DataTypes.DATE,
		defaultValue: sequelize.NOW,
	},
	etiqueta: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	laboratorio: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	valor: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
