import { Router } from 'express';
import { register, login, getUsers } from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, admin, getUsers);

export default router;
