import express from 'express';
const router = express.Router();

import authMiddleware from '../middleware/authMiddleware.js';

import { registerUser ,loginUser , logoutUser } from "../controller/authController.js";

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout',authMiddleware, logoutUser);



export default router;


