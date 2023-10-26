import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';



export const muestra = sequelize.define('muestras', {
    idMuestra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


