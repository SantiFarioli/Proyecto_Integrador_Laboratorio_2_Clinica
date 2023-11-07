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

usuario.hasOne(recepcionista);
recepcionista.belongsTo(usuario);

usuario.hasOne(tecnicoBioquimico);
tecnicoBioquimico.belongsTo(usuario);

usuario.hasOne(admin);
admin.belongsTo(usuario);

usuario.hasOne(bioquimico);
bioquimico.belongsTo(usuario);

usuario.hasOne(usuarioPaciente);
usuarioPaciente.belongsTo(usuario);
