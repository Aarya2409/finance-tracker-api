import { Router } from 'express';
import categoryRoutes from './category.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);

export default router;

