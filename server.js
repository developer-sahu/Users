import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import config from './config/config.js';
import { connectToDB } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import teamRoutes from './routes/team.routes.js'

const app = express();
const PORT = config.port;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the API" });
});

app.use('/auth', authRoutes);
app.use('/team', teamRoutes);


(async () => {
    try {
        await connectToDB();
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (error) {
        console.error('Server Can Not Started...!');
    }
})();







