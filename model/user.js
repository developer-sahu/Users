// models/User.js
import { DataTypes } from "sequelize";
import { DB } from "../config/database.js";

const User = DB.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('member', 'teamleader', 'manager', 'admin'),
        allowNull: false,
        defaultValue: 'member',
    },
    department: {
        type: DataTypes.ENUM('General', 'Development', 'Digital-Marketing'),
        allowNull: false,
        defaultValue: 'General',
    },
});

export default User;

