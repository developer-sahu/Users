import { Router } from 'express';

import authRoutes from './auth.routes.js';
import teamRoutes from './team.routes.js';
import assignRoutes from './assign.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/team', teamRoutes);
router.use('/assigned', assignRoutes);

export default router;
