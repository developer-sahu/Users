import express from "express";
import { createTeam, assignTouser, removeTouser, assignTeamLeader } from "../controller/teamController.js";

const router = express.Router();

router.post('/create', createTeam);
router.post('/assign', assignTouser);
router.post('/removed', removeTouser);

router.put('/assign-tl', assignTeamLeader);

export default router;

