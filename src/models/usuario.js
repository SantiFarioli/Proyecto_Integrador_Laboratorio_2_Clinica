import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { auditoria } from './auditoria.js';
import { recepcionista } from './recepcionista.js';
import { tecnicoBioquimico } from './tecnicoBioquimico.js';
import { admin } from './admin.js';
import { bioquimico } from './bioquimico.js';
import { usuarioPaciente } from './usuarioPaciente.js'

export const usuario = sequelize.define('usuarios', {
	idUsuario: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	rol: {
		type: DataTypes.STRING,
		allowNull: false,
	},
});

usuario.hasMany(auditoria, {
	foreignKey: 'idUsuario',
	sourceKey: 'idUsuario',
});

auditoria.belongsTo(usuario, {
	foreignKey: 'idUsuario',
	targetKey: 'idUsuario',
});

usuario.hasMany(recepcionista, {
	foreignKey: 'idUsuario',
	targetKey: 'idUsuario',
});


usuario.hasMany(tecnicoBioquimico, {
	foreignKey: 'idUsuario',
	targetKey: 'idUsuario',
});


usuario.hasMany(admin, {
	foreignKey: 'idUsuario',
	targetKey: 'idUsuario',
});


usuario.hasMany(bioquimico, {
	foreignKey: 'idUsuario',
	targetKey: 'idUsuario',
});


usuario.hasMany(usuarioPaciente, {
	foreignKey: 'idUsuario',
	targetKey: 'idUsuario',
});

