import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    title: { type: String, trim: true },
    comment: { type: String, trim: true }
  },
  { timestamps: true }
);

reviewSchema.index({ product: 1, customer: 1 }, { unique: true });

export const Review = mongoose.model('Review', reviewSchema);
