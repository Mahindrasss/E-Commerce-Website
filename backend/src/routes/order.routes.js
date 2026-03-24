import { Router } from 'express';
import { createOrder, myOrders, sellerOrders, updateOrderStatus } from '../controllers/order.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', protect, authorize('customer'), createOrder);
router.get('/me', protect, authorize('customer'), myOrders);
router.get('/seller', protect, authorize('seller'), sellerOrders);
router.patch('/:id/status', protect, authorize('seller'), updateOrderStatus);

export default router;
