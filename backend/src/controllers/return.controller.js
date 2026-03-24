import { Order } from '../models/order.model.js';
import { ReturnRequest } from '../models/return-request.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/apiError.js';

export const createReturnRequest = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ _id: req.body.orderId, customer: req.user._id });
  if (!order) throw new ApiError(404, 'Order not found');

  const request = await ReturnRequest.create({
    order: order._id,
    customer: req.user._id,
    reason: req.body.reason
  });

  order.orderStatus = 'returned';
  await order.save();

  res.status(201).json(request);
});

export const myReturnRequests = asyncHandler(async (req, res) => {
  const requests = await ReturnRequest.find({ customer: req.user._id }).populate('order', 'totalAmount orderStatus');
  res.json(requests);
});

export const listReturnRequests = asyncHandler(async (req, res) => {
  const requests = await ReturnRequest.find().populate('order', 'totalAmount orderStatus').populate('customer', 'name email');
  res.json(requests);
});

export const resolveReturnRequest = asyncHandler(async (req, res) => {
  const request = await ReturnRequest.findById(req.params.id);
  if (!request) throw new ApiError(404, 'Return request not found');

  request.status = req.body.status;
  request.adminNote = req.body.adminNote || '';
  await request.save();

  const order = await Order.findById(request.order);
  if (request.status === 'refunded') {
    order.orderStatus = 'refunded';
    order.paymentStatus = 'failed';
    await order.save();
  }

  res.json(request);
});
