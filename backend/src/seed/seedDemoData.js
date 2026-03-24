import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import { Banner } from '../models/banner.model.js';
import { Category } from '../models/category.model.js';
import { Coupon } from '../models/coupon.model.js';
import { Product } from '../models/product.model.js';
import { User } from '../models/user.model.js';

const run = async () => {
  await connectDB();
  await Promise.all([
    User.deleteMany({}),
    Product.deleteMany({}),
    Category.deleteMany({}),
    Banner.deleteMany({}),
    Coupon.deleteMany({})
  ]);

  const password = await bcrypt.hash('Pass@123', 10);
  const [admin, seller, customer] = await User.create([
    { name: 'Admin', email: 'admin@demo.com', mobile: '9000000001', password, role: 'admin', referralCode: 'ADMIN01' },
    { name: 'Seller One', email: 'seller@demo.com', mobile: '9000000002', password, role: 'seller', isKycApproved: true, referralCode: 'SELL01' },
    { name: 'Customer', email: 'customer@demo.com', mobile: '9000000003', password, role: 'customer', referralCode: 'CUST01' }
  ]);

  await Category.create([
    { name: 'Fashion', slug: 'fashion', icon: '👗' },
    { name: 'Home', slug: 'home', icon: '🏠' }
  ]);

  await Banner.create([
    { title: 'Festive Sale', imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b', ctaLink: '/products?category=Fashion', priority: 10 },
    { title: 'Home Essentials', imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858', ctaLink: '/products?category=Home', priority: 9 }
  ]);

  await Coupon.create({
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderAmount: 499,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 90)
  });

  await Product.create([
    {
      seller: seller._id,
      title: 'Pastel Saree Combo',
      slug: 'pastel-saree-combo',
      description: 'Soft cotton pastel saree set for daily wear',
      price: 899,
      category: 'Fashion',
      stock: 120,
      rating: 4.4,
      numReviews: 120,
      images: ['https://images.unsplash.com/photo-1610189011407-0f6d2be57f89'],
      isApproved: true,
      tags: ['saree', 'women', 'trending']
    },
    {
      seller: seller._id,
      title: 'Kitchen Storage Box Set',
      slug: 'kitchen-storage-box-set',
      description: 'Set of 6 stackable airtight storage boxes',
      price: 499,
      category: 'Home',
      stock: 75,
      rating: 4.1,
      numReviews: 86,
      images: ['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7'],
      isApproved: true,
      tags: ['kitchen', 'home', 'storage']
    }
  ]);

  console.log('Seed data inserted', { admin: admin.email, seller: seller.email, customer: customer.email });
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
