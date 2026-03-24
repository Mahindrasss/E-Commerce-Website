import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'seller', 'customer'],
      default: 'customer'
    },
    isKycApproved: { type: Boolean, default: false },
    addresses: [{ label: String, line1: String, city: String, state: String, pincode: String }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    preferredLanguage: { type: String, enum: ['en', 'hi'], default: 'en' },
    walletBalance: { type: Number, default: 0 },
    referralCode: { type: String, unique: true, sparse: true },
    referredBy: { type: String }
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
