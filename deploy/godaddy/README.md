# GoDaddy Node.js deployment

This setup runs the current gym demo as one Node.js application:

- React frontend and Express API are built together.
- Express serves the compiled frontend.
- API requests remain same-origin under `/api`.
- The health check is available at `/api/healthz`.
- The Replit project remains separate and is not deleted or modified by deployment.

## Requirements

- GoDaddy Node.js hosting with terminal or SSH access
- Node.js 22 (Node.js 20 is also acceptable)
- pnpm enabled through Corepack
- A domain name pointed at the VPS
- Clerk production configuration

Do not put passwords, Clerk secret keys, or database credentials in the
repository.

## GoDaddy Node.js application settings

Set the application root to the repository root and use these commands:

```bash
corepack enable
pnpm install --frozen-lockfile
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/gym-management run build
pnpm --filter @workspace/api-server run build
```

Use this startup command:

```bash
node artifacts/api-server/dist/index.mjs
```

Set these environment variables in GoDaddy:

```bash
NODE_ENV=production
WEB_DIST_DIR=artifacts/gym-management/dist/public
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_CLERK_PROXY_URL=
```

GoDaddy supplies `PORT` for the running Node.js app. Do not commit the real
values above or put secret values into the frontend source.

## Verify

After restarting the Node.js application, open:

```text
https://YOUR_DOMAIN/api/healthz
```

The response should be:

```bash
{"status":"ok"}
```

Then open the root domain and confirm the Iron Roy Gym landing page loads.

## If GoDaddy requires a startup file

Use:

```text
artifacts/api-server/dist/index.mjs
```

If the panel asks for an application port, use the port assigned by GoDaddy or
the value shown in its Node.js application settings. Do not hard-code a public
port in the application.

## Docker option

`deploy/godaddy/Dockerfile` is still available if you later move to a GoDaddy
VPS with Docker. It is not needed for GoDaddy's managed Node.js hosting.

## Demo limitation

The current gym routes use seeded in-memory data. The container is suitable for
demonstration and review, but records reset after a restart. Before accepting
real customer data, add PostgreSQL persistence, tenant isolation, API
authentication, role enforcement, backups, and payment webhooks.