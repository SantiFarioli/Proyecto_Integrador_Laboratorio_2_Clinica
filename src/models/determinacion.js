import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { valor_referencia } from './valor_referencia.js';

export const determinacion = sequelize.define('determinaciones', {
	idDeterminacion: {
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
	unidadMedida: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	metodoAnalisis: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

determinacion.hasMany(valor_referencia, {
	foreignKey: 'idDeterminacion',
	surceKey: 'idDeterminacion',
});

valor_referencia.belongsTo(determinacion, {
	foreignKey: 'idDeterminacion',
	targetKey: 'idDeterminacion',
});
