import { Router } from 'express';
import {
  approveProduct,
  createProduct,
  listProducts,
  productBySlug,
  recommendations,
  searchAutocomplete,
  updateProduct
} from '../controllers/product.controller.js';
import { authorize, protect } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', listProducts);
router.get('/search/autocomplete', searchAutocomplete);
router.get('/recommendations', recommendations);
router.get('/:slug', productBySlug);

router.post('/', protect, authorize('seller'), createProduct);
router.put('/:id', protect, authorize('seller'), updateProduct);
router.patch('/:id/approve', protect, authorize('admin'), approveProduct);

export default router;
