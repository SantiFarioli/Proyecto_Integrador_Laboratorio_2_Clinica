import { sequelize } from "../database/database.js";
import {DataTypes} from 'sequelize';

export const paciente = sequelize.define('pacientes', {
    idPaciente: {
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
    dni:  {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    localidad: {
        type: DataTypes.STRING,
        allowNull: false
    },
    provincia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sexo: {
        type: DataTypes.STRING,
        allowNULL: false
    },
    embarazo: {
        type: DataTypes.BOOLEAN,
        allowNULL: false
    },
    fecha_nac: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    },
    correo_electronico: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefono: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    obra_social:{
        type: DataTypes.STRING,
        allowNull: false
    },
    num_afiliado: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

