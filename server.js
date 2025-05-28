import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import config from './config/config.js';
import { connectToDB } from './config/database.js';
import router from './routes/index.routes.js';


const app = express();
const PORT = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the API" });
});


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







