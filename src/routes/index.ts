import { Router } from 'express';
import categoryRoutes from './category.routes';
import authRoutes from './auth.routes';
import transactionRoutes from './transaction.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/transactions', transactionRoutes);

export default router;


