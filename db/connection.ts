import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();


const db = new Sequelize(process.env.NAME_DB!, process.env.USER_DB!, process.env.PASSWORD_DB!, {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    // logging: false
});


export default db;