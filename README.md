# ResellHub (Meesho-style E-commerce Platform)

A scalable, mobile-first, SEO-aware e-commerce/reselling monorepo for India-focused commerce with **Admin**, **Seller**, and **Customer** roles.

## Tech Stack
- **Frontend:** Next.js 14, Tailwind CSS, Zustand
- **Backend:** Node.js, Express.js, Mongoose (MVC-style modules)
- **Database:** MongoDB
- **Integrations (hooks/config):** Razorpay, Cloudinary, Firebase

## Monorepo Structure
- `frontend/` — Storefront + role dashboards
- `backend/` — API, auth, business logic, seed data
- `docs/` — Deployment guide + Postman collection

## Implemented Feature Matrix

### Authentication & Access
- Email/password signup/login
- Mobile OTP login (demo OTP flow for dev)
- JWT auth middleware + role-based access control

### Customer Experience
- Homepage with dynamic recommendations
- Product listing with search/filter support
- Product details page
- Cart state management (Zustand)
- Address management API
- Wishlist API
- Checkout-ready order API with coupon support
- Order history, tracking status, return/refund requests
- Review and rating APIs
- Referral earning flow + wallet credits

### Seller Panel APIs
- Seller product CRUD
- Inventory decrement on order placement
- Seller order processing/status updates
- Reseller margin per line item

### Admin Panel APIs
- Dashboard analytics (users/sellers/products/orders/revenue)
- Product moderation (approval workflow)
- Seller listing endpoint
- Category and banner management APIs
- Return/refund request resolution

### Advanced
- Search autocomplete endpoint
- Recommendation service (category/rating/recency)
- Coupon system
- Multi-language preference (`en`, `hi`) on user profile

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### Frontend
```bash
cd frontend
npm install
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1 npm run dev
```

## Demo Credentials
- Admin: `admin@demo.com` / `Pass@123`
- Seller: `seller@demo.com` / `Pass@123`
- Customer: `customer@demo.com` / `Pass@123`

## Production Checklist
- Replace demo OTP with SMS provider.
- Configure Razorpay server-side order/signature verification.
- Configure Cloudinary uploads and Firebase notifications.
- Add Redis cache + background job workers for notifications and analytics rollups.
- Add E2E tests and CI pipeline (lint/test/build gates).
