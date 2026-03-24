import { User } from '../models/user.model.js';
import { Product } from '../models/product.model.js';
import { Order } from '../models/order.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const dashboard = asyncHandler(async (req, res) => {
  const [users, sellers, products, approvedProducts, totalOrders] = await Promise.all([
    User.countDocuments(),
    User.countDocuments({ role: 'seller' }),
    Product.countDocuments(),
    Product.countDocuments({ isApproved: true }),
    Order.countDocuments()
  ]);

  const sales = await Order.aggregate([{ $group: { _id: null, revenue: { $sum: '$totalAmount' } } }]);

  res.json({
    users,
    sellers,
    products,
    approvedProducts,
    totalOrders,
    revenue: sales[0]?.revenue || 0
  });
});

export const listPendingProducts = asyncHandler(async (req, res) => {
  const data = await Product.find({ isApproved: false }).sort({ createdAt: -1 });
  res.json(data);
});

export const listSellers = asyncHandler(async (req, res) => {
  const data = await User.find({ role: 'seller' }).select('-password').sort({ createdAt: -1 });
  res.json(data);
});
