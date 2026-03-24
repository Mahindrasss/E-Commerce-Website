import { Router } from 'express';
import { login, requestOtp, signup, verifyOtp } from '../controllers/auth.controller.js';
import { requireFields } from '../middlewares/validate.middleware.js';

const router = Router();

router.post('/signup', requireFields('name', 'email', 'mobile', 'password'), signup);
router.post('/login', requireFields('email', 'password'), login);
router.post('/otp/request', requireFields('mobile'), requestOtp);
router.post('/otp/verify', requireFields('mobile', 'otp'), verifyOtp);

export default router;
