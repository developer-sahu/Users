import express from "express";
import { createTeam, assignUser, removeUser, assignTeamLeader ,removedTeamLeader } from "../controller/teamController.js";

const router = express.Router();

router.post('/create-team', createTeam);
router.post('/assign-user', assignUser);
router.post('/removed-user', removeUser);

router.put('/assign-tl', assignTeamLeader);
router.post('/removed-tl',removedTeamLeader);


export default router;

