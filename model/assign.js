import {DB} from "../config/database.js";
import { DataTypes } from "sequelize";

const assigned = DB.define("assigned", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    teamleader: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default assigned;