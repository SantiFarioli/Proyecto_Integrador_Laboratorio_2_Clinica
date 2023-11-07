import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const usuarioPaciente = sequelize.define('usuariosPacientes', {
    idUsuaruioPaciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
});


    
