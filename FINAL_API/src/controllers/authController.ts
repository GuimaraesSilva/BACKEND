import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../middleware/authService.js';
import User from '../models/userModel.js';



export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const { user, token } = await registerUser(name, email, password);
      res.status(201).json({ user, token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { user, token } = await loginUser(email, password);
      res.status(200).json({ user, token });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching users' });
    }
  }
}

export default new AuthController();
export const register = new AuthController().register;
export const login = new AuthController().login;
export const getUsers = new AuthController().getUsers;
