import bcrypt from 'bcryptjs';
import { User } from '../models/user.model.js';
import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { signToken } from '../services/token.service.js';

export const signup = asyncHandler(async (req, res) => {
  const { name, email, mobile, password, role = 'customer' } = req.body;
  const existing = await User.findOne({ $or: [{ email }, { mobile }] });
  if (existing) throw new ApiError(409, 'Email or mobile already exists');

  const hashed = await bcrypt.hash(password, 10);
  const referralCode = `REF${Date.now().toString().slice(-6)}`;
  const user = await User.create({ name, email, mobile, password: hashed, role, referralCode });

  return res.status(201).json({
    message: 'Signup successful',
    token: signToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, 'Invalid credentials');

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new ApiError(401, 'Invalid credentials');

  return res.json({
    message: 'Login successful',
    token: signToken(user._id),
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

export const requestOtp = asyncHandler(async (req, res) => {
  const { mobile } = req.body;
  return res.json({
    message: 'OTP sent (demo mode)',
    mobile,
    otp: process.env.NODE_ENV === 'production' ? undefined : '123456'
  });
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { mobile, otp } = req.body;
  if (otp !== '123456') throw new ApiError(400, 'Invalid OTP');

  let user = await User.findOne({ mobile });
  if (!user) {
    user = await User.create({
      name: `User-${mobile.slice(-4)}`,
      email: `${mobile}@demo.local`,
      mobile,
      password: await bcrypt.hash('Pass@123', 10)
    });
  }

  return res.json({
    message: 'OTP verified',
    token: signToken(user._id),
    user: { id: user._id, name: user.name, role: user.role }
  });
});
