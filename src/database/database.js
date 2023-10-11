import Sequelize from 'sequelize';

export const sequelize = new Sequelize('laboratorio_clinico','root', '', {
    host: 'localhost',
    dialect: 'mysql'
});