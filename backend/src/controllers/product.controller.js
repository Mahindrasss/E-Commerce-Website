import { Product } from '../models/product.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';
import { getRecommendedProducts } from '../services/recommendation.service.js';

export const listProducts = asyncHandler(async (req, res) => {
  const { category, minPrice, maxPrice, q } = req.query;
  const query = { isApproved: true };

  if (category) query.category = category;
  if (minPrice || maxPrice) query.price = {};
  if (minPrice) query.price.$gte = Number(minPrice);
  if (maxPrice) query.price.$lte = Number(maxPrice);
  if (q) query.title = { $regex: q, $options: 'i' };

  const products = await Product.find(query).sort({ createdAt: -1 }).limit(50);
  res.json(products);
});

export const productBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isApproved: true });
  if (!product) throw new ApiError(404, 'Product not found');
  res.json(product);
});

export const createProduct = asyncHandler(async (req, res) => {
  const payload = { ...req.body, seller: req.user._id, isApproved: false };
  const product = await Product.create(payload);
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id, seller: req.user._id });
  if (!product) throw new ApiError(404, 'Product not found');

  Object.assign(product, req.body, { isApproved: false });
  await product.save();
  res.json(product);
});

export const approveProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
  if (!product) throw new ApiError(404, 'Product not found');
  res.json(product);
});

export const searchAutocomplete = asyncHandler(async (req, res) => {
  const q = req.query.q || '';
  const data = await Product.find({ title: { $regex: q, $options: 'i' }, isApproved: true })
    .select('title slug')
    .limit(10);
  res.json(data);
});

export const recommendations = asyncHandler(async (req, res) => {
  const data = await getRecommendedProducts(req.query.category, 8);
  res.json(data);
});
