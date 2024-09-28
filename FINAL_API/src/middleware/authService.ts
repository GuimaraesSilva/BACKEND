import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


const generateToken = (userId: string) => {
  const secretKey = process.env.JWT_SECRET;
  if (!secretKey) {
    console.error('JWT_SECRET is not set in the environment variables.');
    throw new Error('JWT secret key is not defined');
  }

  // Proceed with token generation
  const token = jwt.sign({ id: userId }, secretKey, { expiresIn: '1h' });
  return token;
};

export default generateToken;

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
