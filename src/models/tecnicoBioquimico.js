import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

export const tecnicoBioquimico = sequelize.define('tecnicosBioquimico', {
	idTecnicoBioquimico: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	apellido: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	dni: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	telefono: {
		type: DataTypes.BIGINT,
		allowNull: false,
	},
	correo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});
