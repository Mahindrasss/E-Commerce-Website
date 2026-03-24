import { User } from '../models/user.model.js';
import { Order } from '../models/order.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password').populate('wishlist', 'title slug price rating');
  res.json(user);
});

export const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.addresses.push(req.body);
  await user.save();
  res.status(201).json(user.addresses);
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user.wishlist.some((id) => id.toString() === req.body.productId)) {
    user.wishlist.push(req.body.productId);
    await user.save();
  }
  res.json({ wishlist: user.wishlist });
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.wishlist = user.wishlist.filter((id) => id.toString() !== req.params.productId);
  await user.save();
  res.json({ wishlist: user.wishlist });
});

export const applyReferral = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const referrer = await User.findOne({ referralCode: req.body.referralCode });
  if (!referrer || referrer._id.toString() === user._id.toString()) {
    return res.status(400).json({ message: 'Invalid referral code' });
  }
  if (user.referredBy) return res.status(400).json({ message: 'Referral already applied' });

  user.referredBy = req.body.referralCode;
  user.walletBalance += 50;
  referrer.walletBalance += 100;
  await Promise.all([user.save(), referrer.save()]);

  res.json({ message: 'Referral applied', walletBalance: user.walletBalance });
});

export const setLanguage = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user._id, { preferredLanguage: req.body.language }, { new: true });
  res.json({ preferredLanguage: user.preferredLanguage });
});

export const customerStats = asyncHandler(async (req, res) => {
  const [orders, spent] = await Promise.all([
    Order.countDocuments({ customer: req.user._id }),
    Order.aggregate([
      { $match: { customer: req.user._id } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ])
  ]);

  res.json({ orders, spent: spent[0]?.total || 0 });
});
