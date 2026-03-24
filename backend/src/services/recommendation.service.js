import { Product } from '../models/product.model.js';

export const getRecommendedProducts = async (category, limit = 8) => {
  const query = category ? { category, isApproved: true } : { isApproved: true };
  return Product.find(query).sort({ rating: -1, createdAt: -1 }).limit(limit);
};
