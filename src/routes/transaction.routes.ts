import { Router } from 'express';
import { transactionController } from '../controllers/transaction.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authenticate);

router.get('/stats', transactionController.getStats);
router.get('/', transactionController.getAll);
router.get('/:id', transactionController.getById);
router.post('/', transactionController.create);
router.patch('/:id', transactionController.update);
router.delete('/:id', transactionController.delete);

export default router;