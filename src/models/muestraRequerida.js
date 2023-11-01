import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const muestraRequerida = sequelize.define('muestrasRequeridas', {
	idMuestraRequerida: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	fechaRecepcion: {
		type: DataTypes.DATE,
		defaultValue: sequelize.NOW,
	},
	entregada: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	etiqueta: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
