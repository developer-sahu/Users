import { User } from "../model/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/config.js";

const { secret, expiresIn } = config.jwt;

export const registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All failds are required " });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already Exist" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.create({ username, email, password: hashPassword });

        res.status(200).json({ success: "User Register Successful" })
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: "Internal Server Error" });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email And password is required" });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalide Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalide Credentials" });
        }

        const token = jwt.sign({ userId: user.id, email: user.email },
            secret,
            { expiresIn });

        res.status(200).json({ message: " Login Successful ", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" })
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.status(200).json({ message: "Logout Successfully" })
    } catch (error) {
        return res.status(200).json({ message: "Logout Failed " })
    }
}

