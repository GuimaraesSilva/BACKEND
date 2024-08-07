import { Request, Response } from "express";
import { IUser } from "../models/userModel.js";
import userService from "../services/userService.js";
import { validationResult } from "express-validator";
import fileService from "../utils/fileService.js";

class UserController {
    getAll = async (req: Request, res: Response) => {
        try {
            const users: IUser[] | undefined = await userService.getAll();

            res.json(users);
        } catch (error) {
            res.status(500).json({ error: "Failed to get users" });
        }
    };
    getOne = async (req: Request, res: Response) => {
        try {
            const userId: string = req.params.id;

            const user = userService.getUserById(userId);

            if (!user) {
                res.status(404).json({ error: "User not found" });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ error: "Failed to get user" });
        }
    };
    register = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            const avatar = req.files?.avatarFile;
            console.log(avatar);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const userToCreate: IUser = req.body;
            const createdUser: any = await userService.register(userToCreate, avatar);
            res.status(201).json(createdUser);
        } catch (error) {
            res.status(500).json({ error: "Failed to create user" });
        }
    };
    login = async (req: Request, res: Response) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }
            const {email, password} = req.body;
            const foundUserWithToken: any = await userService.login(email, password);
            if(foundUserWithToken === null){
                return res.status(404).json({error: 'Invalid email or password'})
            }
            res.json(foundUserWithToken);
        } catch (error) {
            res.status(500).json({ error: "Failed to create user" });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const userId: string = req.params.id;
            const userToUpdate: IUser = req.body;
            const updatedUser = userService.update(userId, userToUpdate);

            if (!updatedUser) {
                res.status(404).json({ error: "User not found" });
            }
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: "Failed to update user" });
        }
    };
    delete = async (req: Request, res: Response) => {
        try {
            const userId: string = req.params.id;
            const deletedUser = userService.delete(userId);

            if (!deletedUser) {
                res.status(404).json({ error: "User not found" });
            }
            res.json(deletedUser);
        } catch (error) {
            res.status(500).json({ error: "Failed to delete user" });
        }
    };
}

export default new UserController();
