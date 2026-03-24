import { Order } from '../models/order.model.js';
import { Product } from '../models/product.model.js';
import { Coupon } from '../models/coupon.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';

export const createOrder = asyncHandler(async (req, res) => {
  const { items, paymentMethod, shippingAddress, couponCode } = req.body;
  if (!items || items.length === 0) throw new ApiError(400, 'Cart is empty');

  let totalAmount = 0;
  const normalizedItems = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product || !product.isApproved) throw new ApiError(400, 'Invalid product in cart');
    if (product.stock < item.quantity) throw new ApiError(400, `${product.title} out of stock`);

    product.stock -= item.quantity;
    await product.save();

    const unitPrice = product.price + (item.resellerMargin || 0);
    totalAmount += unitPrice * item.quantity;

    normalizedItems.push({
      product: product._id,
      title: product.title,
      quantity: item.quantity,
      unitPrice,
      resellerMargin: item.resellerMargin || 0
    });
  }

  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode, isActive: true, expiresAt: { $gt: new Date() } });
    if (coupon && totalAmount >= coupon.minOrderAmount) {
      totalAmount -= coupon.discountType === 'flat'
        ? coupon.discountValue
        : totalAmount * (coupon.discountValue / 100);
    }
  }

  const order = await Order.create({
    customer: req.user._id,
    seller: req.body.sellerId,
    items: normalizedItems,
    totalAmount: Math.max(0, Math.round(totalAmount)),
    paymentMethod,
    paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
    shippingAddress
  });

  res.status(201).json(order);
});

export const myOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ customer: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const sellerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ seller: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, seller: req.user._id });
  if (!order) throw new ApiError(404, 'Order not found');

  order.orderStatus = req.body.orderStatus;
  if (req.body.orderStatus === 'refunded') order.paymentStatus = 'failed';
  await order.save();

  res.json(order);
});
