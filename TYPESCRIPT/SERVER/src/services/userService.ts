import { IUser } from "../interfaces/interfaces.js";
import jsonFileReader from "../utils/jsonFileReader.js";
import { v4 as uuidv4 } from 'uuid';

const usersJsonPath: string = './src/data/users.json'

class UserService {
    private readUsersJson(): IUser[] | undefined {
        try {
            const data = jsonFileReader.read(usersJsonPath);

            console.log(data);
            return data;
        } catch (error) {
            throw new Error('Failed to read users from file')
        }
    }

    private writeUsersJson(users : IUser[]): void{
        try {
            jsonFileReader.write(usersJsonPath, users);
        } catch (error) {
            throw new Error('Failed to write users to file')
        }
    }

    getAll = async () => {
        try {
            return this.readUsersJson();
        } catch (error) {
            throw new Error('Failed to get all users');
        }
    }

    getUserById = (userId: string): IUser | undefined => {
        try {
            const users: IUser[] |undefined = this.readUsersJson();

            const foundUser = users?.find(user => user.id === userId);

            return foundUser;
        } catch (error) {
            throw new Error('Failed to get user by ID');
        }
    }
}

export default new UserService();