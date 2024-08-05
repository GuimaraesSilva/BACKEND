import { IUser } from "../models/userModel.js";
// import JsonFileReader from "../utils/jsonFileReader.js";
import UserModel from "../models/userModel.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

// const usersJsonPath: string = "./src/data/users.json";

class UserService {
    // private readUsersJson(): IUser[] | undefined {
    //     try {
    //         const data = JsonFileReader.read(usersJsonPath);
    //         return data;
    //     } catch (error) {
    //         throw new Error("Failed to read users from file");
    //     }
    // }

    // private writeUsersJson(users: IUser[]): void {
    //     try {
    //         JsonFileReader.write(usersJsonPath, users);
    //     } catch (error) {
    //         throw new Error("Failed to write users to file");
    //     }
    // }

    getAll = async (): Promise<IUser[]> => {
        try {
            return await UserModel.find();
        } catch (error) {
            throw new Error("Failed to get all users");
        }
    };

    getUserById = async (userId: string): Promise<IUser | null> => {
        try {
            const foundUser: IUser | null = await UserModel.findById(userId);

            return foundUser;
        } catch (error) {
            throw new Error("Failed to get user by ID");
        }
    };

    register = async (newUser: IUser): Promise<IUser> => {
        try {
            const users = await UserModel.create(newUser);
            newUser.id = uuidv4();
            newUser.password = await bcrypt.hash(newUser.password, 7);
            return newUser;
        } catch (error) {
            throw new Error("Failed to create user");
        }
    };

    update = async (userId: string, user: IUser): Promise<IUser | null> => {
        try {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                user,
                { new: true }
            );

            return updatedUser;
        } catch (error) {
            throw new Error("Failed to update user");
        }
    };
    delete = async (userId: string): Promise<IUser | null> => {
        try {
            const deletedUser = await UserModel.findByIdAndDelete(userId);

            return deletedUser;
        } catch (error) {
            throw new Error("Failed to delete user");
        }
    };
}

export default new UserService();
