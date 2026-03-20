import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';
import { authenticate } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, categoryController.getAll);
router.post('/', authenticate, categoryController.create);
router.delete('/:id', authenticate, categoryController.delete);

export default router;
