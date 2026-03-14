import jwt from 'jsonwebtoken';
import { AuthenticatedUser } from '../types/user';

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

export const generateAccessToken = (user: AuthenticatedUser): string => {
  return jwt.sign(user, ACCESS_SECRET, {
    expiresIn: '15m',
  });
};

export const generateRefreshToken = (user: AuthenticatedUser): string => {
  return jwt.sign(user, REFRESH_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyAccessToken = (token: string): AuthenticatedUser => {
  return jwt.verify(token, ACCESS_SECRET) as AuthenticatedUser;
};

export const verifyRefreshToken = (token: string): AuthenticatedUser => {
  return jwt.verify(token, REFRESH_SECRET) as AuthenticatedUser;
};