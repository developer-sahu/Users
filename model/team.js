import { DB } from "../config/database.js";
import { DataTypes } from "sequelize";

const Team = DB.define("Team", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,

    },
    team_name: {
        type: DataTypes.INTEGER,
        allowNull: true,

    },
    discription: {
        type: DataTypes.JSON,
        allowNull: true,
    },

});

export default Team;
