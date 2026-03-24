# Deployment Guide

## Frontend (Vercel)
1. Import repository in Vercel.
2. Set root directory to `frontend`.
3. Add env variable:
   - `NEXT_PUBLIC_API_URL=https://<your-backend-domain>/api/v1`
4. Deploy.

## Backend (Render or AWS)
1. Create web service from `backend` folder.
2. Build command: `npm install`
3. Start command: `npm start`
4. Configure environment values from `backend/.env.example`.
5. Allow inbound from frontend domain via `CORS_ORIGIN`.

## Database (MongoDB Atlas)
1. Create cluster and database user.
2. Set network access to backend host(s).
3. Add connection string in `MONGODB_URI`.

## Production Checklist
- Rotate JWT and provider secrets.
- Add SSL-only cookie/JWT transport if required.
- Configure Cloudinary preset and Firebase service credentials.
- Add monitoring (logs + uptime + APM).
- Set CDN and image optimization headers.
