import express from "express";
import { createTeam, assignTouser , removeTouser } from "../controller/teamController.js";

const router = express.Router();

router.post('/create', createTeam);
router.post('/assign', assignTouser);
router.post('/removed', removeTouser);


export default router;

