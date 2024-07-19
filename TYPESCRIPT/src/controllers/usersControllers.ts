import { write } from 'fs';
import { Request, Response } from 'express';
import { IUser } from '../interfaces/interfaces.js';
import JsonFileReader from '../utils/jsonFileReader.js';

const usersFilePath = './src/data/users.json'

class UserController {
    // private readUsers(): IUser[] {
    //     return JsonFileReader.read(userFilePath);
    // }
    // private writeUser(users: IUser[]): void {
    //     return JsonFileReader.write(usersFilePath, users);
    // }
    getAll(req: Request, res: Response) {
        const users: IUser[] = JsonFileReader.read(usersFilePath);
        res.json(users);
    }
    getOne(req: Request, res: Response) {
        const userId: number = parseInt(req.params.id);
        const users: IUser[] = JsonFileReader.read(usersFilePath);
        const foundUser: IUser | undefined = users.find(user => user.id === userId);
        if(!foundUser) {
            res.status(404).json({error: "User not found"});
   }
   res.json(foundUser);
    }
    create(req: Request, res: Response) {}
    update(req: Request, res: Response) {}
    delete(req: Request, res: Response) {}
}
export default new UserController();