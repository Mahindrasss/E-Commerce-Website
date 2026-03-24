import { Router } from 'express';
import {
  createReturnRequest,
  listReturnRequests,
  myReturnRequests,
  resolveReturnRequest
} from '../controllers/return.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';
import { requireFields } from '../middlewares/validate.middleware.js';

const router = Router();

router.post('/', protect, authorize('customer'), requireFields('orderId', 'reason'), createReturnRequest);
router.get('/me', protect, authorize('customer'), myReturnRequests);
router.get('/', protect, authorize('admin'), listReturnRequests);
router.patch('/:id', protect, authorize('admin'), requireFields('status'), resolveReturnRequest);

export default router;
