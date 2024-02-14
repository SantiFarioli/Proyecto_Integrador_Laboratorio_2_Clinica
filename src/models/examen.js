import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { determinacion } from './determinacion.js';
import { muestra } from './muestra.js';

export const examen = sequelize.define(
	'examenes',
	{
		idExamen: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		codigo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		descripcion: {
			type: DataTypes.STRING,
			allowNull: false,
			timeStamp: true,
		},
		requisitosExamen: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		tiempoDeExamen: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		timestamps: false,
	}
);

examen.hasMany(determinacion, {
	foreignKey: 'idExamen',
	sourceKey: 'idExamen',
});

determinacion.belongsTo(examen, {
	foreignKey: 'idExamen',
	targetKey: 'idExamen',
});

muestra.belongsTo(examen, {
	foreignKey: 'idExamen',
	targetKey: 'idExamen',
	as: 'examen',
});
