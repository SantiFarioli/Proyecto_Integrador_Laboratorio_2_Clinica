import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { muestraRequerida } from './muestraRequerida.js';

export const orden_trabajo = sequelize.define('ordenes_trabajo', {
	idOrdenTrabajo: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	fechaCreacion: {
		type: DataTypes.DATE,
		defaultValue: sequelize.NOW,
	},
	estado: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	diagnostico: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	cancelada: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

orden_trabajo.hasMany(muestraRequerida, {
	foreignKey: 'idOrdenTrabajo',
	sourceKey: 'idOrdenTrabajo',
});

muestraRequerida.belongsTo(orden_trabajo, {
	foreignKey: 'idOrdenTrabajo',
	targetKey: 'idOrdenTrabajo',
});
