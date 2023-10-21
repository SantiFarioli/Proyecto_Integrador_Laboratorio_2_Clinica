import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { orden_trabajo } from './orden_trabajo.js';

export const medico = sequelize.define('medicos', {
	idMedico: {
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
	especialidad: {
		type: DataTypes.STRING,
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
	direccion: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

medico.hasMany(orden_trabajo, {
	foreignKey: 'idMedico',
	surceKey: 'idMedico',
});

orden_trabajo.belongsTo(medico, {
	foreignKey: 'idMedico',
	targetKey: 'idMedico',
	as: 'medico',
});
