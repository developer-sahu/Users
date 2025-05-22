import { Sequelize } from "sequelize";
import config from "./config.js";

const { host, name, user, password, dialect, logging } = config.database;

export const DB = new Sequelize(name, user, password, { host, dialect, logging, });

export const connectToDB = async () => {
    try {
        await DB.authenticate();
        console.log('Database Connected...!');
        await DB.sync();
        // await DB.sync({alter : true });
    } catch (error) {
        console.log('Error Connecting Database!', error)
    }
}
