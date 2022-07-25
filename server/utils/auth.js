import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const auth = async (context) => {
  const authHeader = context.req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new AuthenticationError('Unauthenticated, no token!');
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new AuthenticationError('Unauthenticated, no token');
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};
