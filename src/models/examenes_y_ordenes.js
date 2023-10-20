import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { examen } from './examen.js';
import { orden_trabajo } from './orden_trabajo.js';

export const examenes_y_ordenes = sequelize.define(
	'examenes_y_ordenes',
	{
		idExamenes_y_ordenes: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
	},
	{
		timestamps: false,
	}
);

orden_trabajo.belongsToMany(examen, {
	through: examenes_y_ordenes,
	foreignKey: 'idOrdenTrabajo',
});

examen.belongsToMany(orden_trabajo, {
	through: examenes_y_ordenes,
	foreignKey: 'idExamen',
});
