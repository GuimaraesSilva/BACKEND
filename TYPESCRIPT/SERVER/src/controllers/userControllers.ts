import { Request, Response } from 'express';
import { IUser } from '../interfaces/interfaces.js';
import userService from '../services/userService.js';

const usersFilePath = './src/data/users.json'

class UserController {
    getAll = async (req: Request, res: Response) => {
        try {
            const users: IUser[] | undefined = await userService.getAll();
            res.json(users);

        } catch (error) {
            res.status(500).json({error:'Failed to get users'});
        }
    }

    getOne(req: Request, res: Response) {
        try {
            const userId: string = req.params.id;
            const user: IUser | undefined = userService.getUserById(userId);

            if (!user) {
                res.status(404).json({error: 'User not found'});
            }
            res.json(user);

        } catch (error) {
            console.log(error);
        }
    }
}

export default new UserController();