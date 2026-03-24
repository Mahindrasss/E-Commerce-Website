import { Router } from 'express';
import adminRoutes from './admin.routes.js';
import authRoutes from './auth.routes.js';
import metaRoutes from './meta.routes.js';
import orderRoutes from './order.routes.js';
import productRoutes from './product.routes.js';
import returnRoutes from './return.routes.js';
import reviewRoutes from './review.routes.js';
import userRoutes from './user.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ status: 'ok' }));
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/admin', adminRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/storefront', metaRoutes);
router.use('/returns', returnRoutes);

export default router;
