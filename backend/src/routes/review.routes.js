import { Router } from 'express';
import { addOrUpdateReview, listProductReviews } from '../controllers/review.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';
import { requireFields } from '../middlewares/validate.middleware.js';

const router = Router();

router.get('/:productId', listProductReviews);
router.post('/:productId', protect, authorize('customer'), requireFields('rating'), addOrUpdateReview);

export default router;
