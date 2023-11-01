import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { muestraRequerida } from './muestraRequerida.js';

export const muestra = sequelize.define('muestras', {
	idMuestra: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	tipo: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	descripcion: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

muestra.hasMany(muestraRequerida, {
	foreignKey: 'idMuestra',
	sourceKey: 'idMuestra',
});

muestraRequerida.belongsTo(muestra, {
	foreignKey: 'idMuestra',
	targetKey: 'idMuestra',
});
