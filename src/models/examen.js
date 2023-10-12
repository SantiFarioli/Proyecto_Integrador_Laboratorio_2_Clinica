import { DataTypes } from "sequelize";
import {sequelize} from "../database/database.js";

export const examen = sequelize.define('examenes', {
    idExamen: {
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
})