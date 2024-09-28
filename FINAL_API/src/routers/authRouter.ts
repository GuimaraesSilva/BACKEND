import { Router } from 'express';
import { register, login, getUsers } from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, admin, getUsers);

export default router;
