import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';
import {auditoria} from './auditoria.js';
import { recepcionista } from './recepcionista.js';
import { tecnicoBioquimico } from './tecnicoBioquimico.js';
import { admin } from './admin.js';

export const usuario = sequelize.define('usuarios', {
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.INTEGER,
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

usuario.hasMany(auditoria, {
    foreignKey: 'idUsuario',
    sourceKey: 'idUsuario'
});

auditoria.belongsTo(usuario, {
    foreignKey: 'idUsuario',
    targetKey: 'idUsuario'
});

usuario.hasOne(recepcionista);
recepcionista.belongsTo(usuario);

usuario.hasOne(tecnicoBioquimico);
tecnicoBioquimico.belongsTo(usuario);

usuario.hasOne(admin);
admin.belongsTo(usuario);