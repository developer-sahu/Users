import { DB } from "../config/database";
import { DataTypes } from "sequelize";

const Assigned = DB.define("assigned", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    teamleader: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },
});

export default Assigned;