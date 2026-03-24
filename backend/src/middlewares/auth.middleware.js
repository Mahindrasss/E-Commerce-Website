import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return next(new ApiError(401, 'Unauthorized'));

  const payload = jwt.verify(token, env.jwtSecret);
  const user = await User.findById(payload.id).select('-password');
  if (!user) return next(new ApiError(401, 'Invalid token'));

  req.user = user;
  next();
};

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'Access denied'));
  }
  next();
};
