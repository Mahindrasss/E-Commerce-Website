import { Banner } from '../models/banner.model.js';
import { Category } from '../models/category.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getStorefrontMeta = asyncHandler(async (req, res) => {
  const [banners, categories] = await Promise.all([
    Banner.find({ isActive: true }).sort({ priority: -1, createdAt: -1 }),
    Category.find({ isActive: true }).sort({ name: 1 })
  ]);
  res.json({ banners, categories });
});

export const upsertCategory = asyncHandler(async (req, res) => {
  const doc = await Category.findOneAndUpdate(
    { slug: req.body.slug },
    { name: req.body.name, slug: req.body.slug, icon: req.body.icon, isActive: req.body.isActive ?? true },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json(doc);
});

export const upsertBanner = asyncHandler(async (req, res) => {
  const doc = await Banner.findOneAndUpdate(
    { title: req.body.title },
    req.body,
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.json(doc);
});
