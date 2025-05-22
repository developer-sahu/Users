import { DB } from "../config/database.js";
import { DataTypes } from "sequelize";

const Team = DB.define("Team", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    team_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    discription: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    department: {
        type: DataTypes.ENUM('General', 'Development', 'Digital-Marketing'),
        allowNull: false,
    },

});

export default Team;
