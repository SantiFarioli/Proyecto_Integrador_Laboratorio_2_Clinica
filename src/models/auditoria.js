import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';

export const auditoria = sequelize.define('auditorias', {
    idAuditoria: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    },
    operacion: {
        type: DataTypes.STRING,
        allowNull: false
    }
});