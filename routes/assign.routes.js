import express from 'express';
const router = express.Router();

import { assignTeamLeader } from "../controller/assignController.js";


router.post('/assign-TeamLeader' , assignTeamLeader);


export default router;
