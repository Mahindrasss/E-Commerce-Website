import { Router } from 'express';
import { getStorefrontMeta, upsertBanner, upsertCategory } from '../controllers/meta.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';
import { requireFields } from '../middlewares/validate.middleware.js';

const router = Router();

router.get('/', getStorefrontMeta);
router.post('/categories', protect, authorize('admin'), requireFields('name', 'slug'), upsertCategory);
router.post('/banners', protect, authorize('admin'), requireFields('title', 'imageUrl'), upsertBanner);

export default router;
