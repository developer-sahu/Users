import { Router } from 'express';

import authRoutes from './auth.routes.js';
import teamRoutes from './team.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/team', teamRoutes);

export default router;
