import { DB } from "../config/database";
import { DataTypes } from "sequelize";

const Assigned = DB.define("assigned", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamleader: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

export default Assigned;
