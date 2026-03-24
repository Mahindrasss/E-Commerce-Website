import { Product } from '../models/product.model.js';
import { Review } from '../models/review.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';

export const listProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId })
    .populate('customer', 'name')
    .sort({ createdAt: -1 });
  res.json(reviews);
});

export const addOrUpdateReview = asyncHandler(async (req, res) => {
  const { rating, title, comment } = req.body;
  const product = await Product.findById(req.params.productId);
  if (!product || !product.isApproved) throw new ApiError(404, 'Product not found');

  await Review.findOneAndUpdate(
    { product: product._id, customer: req.user._id },
    { rating, title, comment },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  const stats = await Review.aggregate([
    { $match: { product: product._id } },
    { $group: { _id: '$product', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } }
  ]);

  product.rating = Number((stats[0]?.avgRating || 0).toFixed(1));
  product.numReviews = stats[0]?.count || 0;
  await product.save();

  res.status(201).json({ message: 'Review saved', rating: product.rating, numReviews: product.numReviews });
});
