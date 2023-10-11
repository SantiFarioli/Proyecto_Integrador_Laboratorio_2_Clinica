import { DataTypes } from "sequelize";
import {sequelize} from "../database/database.js";

export const orden_trabajo = sequelize.define('ordenes_trabajo', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    },
    estado: {
        type: DataTypes.STRING
    },
    diagnostico: {
        type: DataTypes.STRING,
        allowNull: false
    },
});
