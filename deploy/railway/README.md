# Railway deployment

This repository is prepared to run the current gym demo as one Railway service:

- Railway builds the React frontend and Express API.
- The API serves the compiled frontend from `artifacts/gym-management/dist/public`.
- The frontend and API share one origin, so the existing `/api` client paths continue to work.
- `/api/healthz` is the Railway health check.

## Setup

1. Push this repository to GitHub.
2. In Railway, create a project from the repository.
3. Keep the repository root as the service root. Railway will read `railway.json`.
4. Add the variables from `deploy/railway/env.example` in the Railway service.
5. Set `VITE_CLERK_PUBLISHABLE_KEY` before the first deploy because Vite embeds it during the frontend build.
6. Generate a Railway domain and open it in a browser.
7. Confirm that `https://YOUR_DOMAIN/api/healthz` returns `{"status":"ok"}`.
8. Add the Railway domain to the allowed origins and production domain settings in Clerk.

## Current demo limitation

The current gym routes use seeded in-memory data. This Railway configuration is
for demonstration and review only. Data will reset when the service restarts.
Before accepting real customer data, move the routes to PostgreSQL, add tenant
isolation, and enforce authentication and roles on the API.