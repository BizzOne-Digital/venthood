# Venthood.ca

Full-stack MERN website for Venthood.ca — a Calgary-based kitchen range hood installation and ventilation company.

## Structure

- `backend/` — Express + MongoDB (Mongoose) API
- `frontend/` — Vite + React + Tailwind CSS site (public site, admin dashboard, customer portal)

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env    # then fill in real values (Mongo URI, JWT secret, SMTP, Cloudinary, CRM)
npm run dev                # starts on http://localhost:5000
node utils/seed.js         # seeds services, testimonials, FAQs, and site settings (idempotent)
```

Create your first admin user manually (e.g. via `/api/auth/register` then updating that user's `role` to
`admin` directly in MongoDB), since registration always creates `customer` accounts by design.

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env    # set VITE_API_URL if backend is not on localhost:5000
npm run dev                # starts on http://localhost:5173
```

Build for production with `npm run build` (outputs to `frontend/dist`).

## Key Notes

- No fixed pricing is shown anywhere on the site — all service pages route to "Request a Quote."
- Placeholder photography (Unsplash URLs) is used across the site — search each file for the "NOTE:" comments
  marking exactly where to swap in real client/job-site photos.
- Bookings and quote requests trigger email notifications via Nodemailer and are wrapped in try/catch so a
  missing/invalid SMTP configuration never crashes the request.
- CRM sync (`backend/services/crmService.js`) is a no-op unless `CRM_ENABLED=true` and `CRM_API_URL` are set.

## Deploying the Frontend to Vercel

The frontend is a static Vite build and is ready to deploy as-is:

1. Push the `frontend/` folder to a Git repo (or import the monorepo and set Vercel's **Root Directory** to `frontend`).
2. In Vercel project settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add an Environment Variable: `VITE_API_URL` = the full URL of your deployed backend API, e.g. `https://your-backend.onrender.com/api`
4. Deploy. `frontend/vercel.json` already handles SPA routing (rewrites all paths to `index.html` so refreshing `/services`, `/admin/dashboard`, etc. doesn't 404).

## Deploying the Backend

The backend is a plain Express app — deploy it to any Node host (Render, Railway, Fly.io, a VPS, etc.), not Vercel serverless (it uses long-lived Mongoose connections and file uploads). Steps:

1. Set all variables from `backend/.env.example` as real environment variables on the host (Mongo URI, JWT secret, Cloudinary, SMTP, etc.).
2. Set `CLIENT_URL` and `ADMIN_URL` to your deployed Vercel frontend URL (e.g. `https://venthood.vercel.app`) — CORS is locked to these origins.
3. Start command: `node server.js` (or `npm start` if you add that script).
4. Once live, come back to Vercel and update `VITE_API_URL` to point at this backend's `/api` base, then redeploy the frontend.

## TODO Before Launch

- [ ] Add real SMTP credentials (Gmail app password or transactional email provider) to `backend/.env`
- [ ] Add real Cloudinary credentials for gallery/quote image uploads
- [ ] Replace all Unsplash placeholder images with real Venthood.ca job-site and team photography
- [ ] Add JSON-LD structured data (LocalBusiness / Service schema) for SEO
- [ ] Connect a live CRM (set `CRM_ENABLED=true`, `CRM_API_URL`, `CRM_API_KEY`)
- [ ] Create the first real admin account and change any default/test credentials
- [ ] Set up a staging deployment (e.g. Render/Railway for backend, Vercel/Netlify for frontend) with production
      env vars, then point `CLIENT_URL`/`ADMIN_URL` and `VITE_API_URL` at the deployed URLs
- [ ] Add Google Analytics / Meta Pixel tracking once domains are live
- [ ] Review and tighten CORS origins for production
