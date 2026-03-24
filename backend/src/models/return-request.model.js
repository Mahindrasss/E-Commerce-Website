import mongoose from 'mongoose';

const returnRequestSchema = new mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ['requested', 'approved', 'rejected', 'refunded'],
      default: 'requested'
    },
    adminNote: { type: String, default: '' }
  },
  { timestamps: true }
);

export const ReturnRequest = mongoose.model('ReturnRequest', returnRequestSchema);
