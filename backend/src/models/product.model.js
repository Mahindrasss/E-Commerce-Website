import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    images: [{ type: String }],
    videos: [{ type: String }],
    isApproved: { type: Boolean, default: false },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
