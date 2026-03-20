// import { Router } from 'express';
// import { authController } from '../controllers/auth.controller';

// const router = Router();

// router.post('/register', authController.register);
// router.post('/login', authController.login);
// router.post('/refresh', authController.refresh);
// router.post('/logout', authController.logout);

// export default router;
import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { authLimiter } from '../middleware/rateLimiter';

const router = Router();

router.post('/register', authLimiter, authController.register);
router.post('/login', authLimiter, authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);

export default router;