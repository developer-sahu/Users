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
        unique: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('member', 'teamleader', 'manager', 'admin'),
        allowNull: false,
        defaultValue: 'member',
    }
}, {
    timestamps: true
});

export default User;

