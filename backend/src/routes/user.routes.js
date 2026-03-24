import { Router } from 'express';
import {
  addAddress,
  addToWishlist,
  applyReferral,
  customerStats,
  me,
  removeFromWishlist,
  setLanguage
} from '../controllers/user.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';
import { requireFields } from '../middlewares/validate.middleware.js';

const router = Router();

router.use(protect);
router.get('/me', me);
router.get('/stats', authorize('customer'), customerStats);
router.post('/addresses', authorize('customer'), requireFields('line1', 'city', 'state', 'pincode'), addAddress);
router.post('/wishlist', authorize('customer'), requireFields('productId'), addToWishlist);
router.delete('/wishlist/:productId', authorize('customer'), removeFromWishlist);
router.post('/referral/apply', authorize('customer'), requireFields('referralCode'), applyReferral);
router.patch('/language', requireFields('language'), setLanguage);

export default router;
