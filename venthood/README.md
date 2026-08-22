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

## Deploying the Backend to Vercel

The backend is deployed as its own separate Vercel project (a second project, not a second URL for the same site —
`frontend/` and `backend/` are two independent deployments). `backend/vercel.json` is already set up to run
`server.js` as a serverless function.

1. Import the repo into a **new** Vercel project and set **Root Directory** to `backend`.
2. Framework Preset: **Other** (no build step needed — it's just Node).
3. Add every variable from `backend/.env.example` as real Environment Variables in that Vercel project's settings
   (Mongo URI, JWT secret, Cloudinary keys, SMTP creds, etc.).
4. Set `CLIENT_URL` and `ADMIN_URL` to your deployed **frontend** Vercel URL (e.g. `https://venthood.vercel.app`) —
   both admin and the public site are the same frontend deployment, so these two values are normally identical;
   they only exist as two separate env vars in case you ever split them onto different domains.
5. Deploy. Your API will be live at `https://your-backend.vercel.app/api/...`.
6. Go back to the **frontend** Vercel project and set `VITE_API_URL=https://your-backend.vercel.app/api`, then redeploy.

Note: Vercel's serverless functions have a request body size limit (4.5MB on the free/Hobby plan). The quote
request form's image uploads should stay under that — if clients need to upload larger files, move the backend
to a persistent host (Render/Railway) instead, no code changes required since `server.js` already supports both.

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
