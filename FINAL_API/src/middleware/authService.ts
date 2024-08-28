import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const generateToken = (id: unknown, role: unknown) => {
  if (typeof id !== 'string' || typeof role !== 'string') {
    throw new Error('Invalid token generation');
  }

  const secretKey = process.env.SECRET_KEY || 'your_secret_key_here';
  const expiresIn = '1h'; // token expires in 1 hour

  const token = jwt.sign({ id, role }, secretKey, {
    expiresIn,
  });

  return token;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return { user, token: generateToken(user._id as string, user.role as string) };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    return { user, token: generateToken(user._id as string, user.role as string) };
  } else {
    throw new Error('Invalid email or password');
  }
};
