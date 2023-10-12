import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";    

export const valor_referencia = sequelize.define('valores_referencia', {
    idValorReferencia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    edadMinima: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    edadMaxima: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valorMinimo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valorMaximo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    embarazo: {
        type: DataTypes.STRING,
        allowNull: false
    },
});