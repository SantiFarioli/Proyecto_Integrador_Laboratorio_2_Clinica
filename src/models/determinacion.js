import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const determinacion = sequelize.define('determinaciones', {
    idDeterminacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unidadMedida: {
        type: DataTypes.STRING,
        allowNull: false
    },
    metodoAnalisis: {
        type: DataTypes.STRING,
        allowNull: false
    },
});