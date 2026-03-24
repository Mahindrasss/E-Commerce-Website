import { Router } from 'express';
import { dashboard, listPendingProducts, listSellers } from '../controllers/admin.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.use(protect, authorize('admin'));
router.get('/dashboard', dashboard);
router.get('/products/pending', listPendingProducts);
router.get('/sellers', listSellers);

export default router;
