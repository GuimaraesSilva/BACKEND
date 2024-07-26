import { Router } from 'express';
import UserController from '../controllers/userController.js';

const router: Router = Router();

// Get all users
router.get('/users', UserController.getAll);

// Get user by ID
router.get('/users/:id', UserController.getOne);

// Create a new user
router.post('/users', UserController.register);

// Update an existing user
router.put('/users/:id', UserController.update);

// Delete an existing user
router.delete('/users/:id', UserController.delete);

export default router;