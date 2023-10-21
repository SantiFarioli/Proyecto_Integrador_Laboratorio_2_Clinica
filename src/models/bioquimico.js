import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { resultado } from './resultado.js';

export const bioquimico = sequelize.define('bioquimicos', {
	idBioquimico: {
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
	especialidad: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

bioquimico.hasMany(resultado, {
	foreignKey: 'idBioquimico',
	sourceKey: 'idBioquimico',
});

resultado.belongsTo(bioquimico, {
	foreignKey: 'idBioquimico',
	sourceKey: 'idBioquimico',
});
