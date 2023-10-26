import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { muestra } from './muestra.js';

export const muestraRequerida = sequelize.define('muestrasRequeridas', {
	idMuestraRequerida: {
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
});

muestraRequerida.hasMany(muestra, {
	foreignKey: 'idMuestraRequerida',
	sourceKey: 'idMuestraRequerida',
});

muestra.belongsTo(muestraRequerida, {
	foreignKey: 'idMuestraRequerida',
	targetKey: 'idMuestraRequerida',
})
