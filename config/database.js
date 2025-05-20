import { Sequelize } from "sequelize";
import config from "./config.js";

const { host, name, user, password, dialect, logging } = config.database;

export const sequelize = new Sequelize(name, user, password, { host, dialect, logging, });

export const connectToDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database Connected...!');
        await sequelize.sync({ alter: true })
    } catch (error) {
        console.log('Error Connecting Database!', error)
    }
}
