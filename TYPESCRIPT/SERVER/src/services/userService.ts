import { IUser } from '../interfaces/interfaces.js';
import JsonFileReader from '../utils/jsonFileReader.js';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

const usersJsonPath: string = './src/data/users.json';

class UserService {
  private readUsersJson(): IUser[] | undefined {
    try {
      const data = JsonFileReader.read(usersJsonPath);
      return data;
    } catch (error) {
      throw new Error('Failed to read users from file');
    }
  }

  private writeUsersJson(users: IUser[]): void {
    try {
      JsonFileReader.write(usersJsonPath, users);
    } catch (error) {
      throw new Error('Failed to write users to file');
    }
  }

  getAll = (): IUser[] | undefined => {
    try {
      return this.readUsersJson();
    } catch (error) {
      throw new Error('Failed to get all users');
    }
  }

  getUserById = (userId: string): IUser | undefined => {
    try {
      const users: IUser[] | undefined = this.readUsersJson();

      const foundUser = users?.find(user => user.id === userId);

      return foundUser;
    } catch (error) {
      throw new Error('Failed to get user by ID');
    }
  }

  register = async  (newUser: IUser): Promise <IUser> => {
    try {
      const users: IUser[] | undefined = this.readUsersJson();
      if (!users) {
        throw new Error('Failed to read users');
      }
      newUser.id = uuidv4();
      newUser.password = await bcrypt.hash(newUser.password, 7);

      users?.push(newUser);

      this.writeUsersJson(users);
      return newUser;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  update = (userId: string, user: IUser): IUser | undefined => {
    try {
      const users: IUser[] | undefined = this.readUsersJson();

      if (!users) {
        throw new Error('Failed to read users');
      }

      const userIndex: number = users.findIndex(user => user.id === userId);

      if (userIndex === -1) {
        return undefined;
      }
      const userToUpdateWithId = { ...users[userIndex], ...user } // Merge user with id

      users[userIndex] = userToUpdateWithId; // Update user

      this.writeUsersJson(users);
      return userToUpdateWithId;
    } catch (error) {
      throw new Error('Failed to update user');
    }
  }
  delete = (userId: string): IUser | undefined => {
    try {
      const users: IUser[] | undefined = this.readUsersJson();

      if (!users) {
        throw new Error('Failed to read users');
      }

      const userIndex: number = users.findIndex(user => user.id === userId);

      if (userIndex === -1) {
        return undefined;
      }
      const arr = users.splice(userIndex, 1);

      console.log(arr);

      const deletedUser = arr[0]; // Delete user
      this.writeUsersJson(users);
      console.log(deletedUser);


      return deletedUser;
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}

export default new UserService();