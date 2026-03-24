import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    ctaLink: { type: String, default: '/' },
    isActive: { type: Boolean, default: true },
    priority: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export const Banner = mongoose.model('Banner', bannerSchema);
