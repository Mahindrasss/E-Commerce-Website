import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        title: String,
        quantity: Number,
        unitPrice: Number,
        resellerMargin: { type: Number, default: 0 }
      }
    ],
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['razorpay', 'cod'], default: 'cod' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderStatus: {
      type: String,
      enum: ['placed', 'packed', 'shipped', 'delivered', 'returned', 'refunded'],
      default: 'placed'
    },
    shippingAddress: {
      line1: String,
      city: String,
      state: String,
      pincode: String
    }
  },
  { timestamps: true }
);

export const Order = mongoose.model('Order', orderSchema);
