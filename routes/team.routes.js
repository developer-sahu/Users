import express from "express";
import { createTeam, assignTouser } from "../controller/teamController.js";

const router = express.Router();

router.post('/create', createTeam);
router.post('/assign', assignTouser);

export default router;

