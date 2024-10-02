import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/userService.js';
import User from '../models/userModel.js';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints relacionados à autenticação
 */
export class AuthController {
  /**
   * @swagger
   * /api/auth/register:
   *   post:
   *     summary: Registra um novo usuário
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
   *               password:
   *                 type: string
   *     responses:
   *       201:
   *         description: Usuário registrado com sucesso
   *       400:
   *         description: Erro na requisição
   */
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const user = await registerUser(name, email, password);
      res.status(201).json(user);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/login:
   *   post:
   *     summary: Faz login de um usuário
   *     tags: [Auth]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - email
   *               - password
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: Login bem-sucedido
   *       401:
   *         description: Credenciais inválidas
   */
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { token, user } = await loginUser(email, password);
      res.json({ token, user });
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/users:
   *   get:
   *     summary: Busca lista de usuários (Apenas Admin)
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de usuários
   *       403:
   *         description: Acesso negado
   */
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await User.find().select('-password');
      res.json(users);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/users/{id}:
   *   put:
   *     summary: Atualiza detalhes do usuário (Apenas Admin)
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID do usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               email:
   *                 type: string
   *               role:
   *                 type: string
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *       403:
   *         description: Acesso negado
   */
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
      res.json(user);
    } catch (error: unknown) {
      next(error);
    }
  }

  /**
   * @swagger
   * /api/auth/users/{id}:
   *   delete:
   *     summary: Deleta um usuário (Apenas Admin)
   *     tags: [Auth]
   *     security:
   *       - bearerAuth: []
   *     parameters:
   *       - in: path
   *         name: id
   *         schema:
   *           type: string
   *         required: true
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Usuário deletado com sucesso
   *       403:
   *         description: Acesso negado
   */
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: 'User deleted' });
    } catch (error: unknown) {
      next(error);
    }
  }
}

export default new AuthController();
export const register = new AuthController().register;
export const login = new AuthController().login;
export const getUsers = new AuthController().getUsers;
export const updateUser = new AuthController().updateUser;
export const deleteUser = new AuthController().deleteUser;

