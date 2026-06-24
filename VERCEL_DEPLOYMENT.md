# Vercel Deployment Guide

## Configuration

This project is configured for deployment on Vercel using `vercel.json`. The configuration includes:

- **Build Command**: `pnpm run build --filter @workspace/mazaj-coffee`
- **Output Directory**: `artifacts/mazaj-coffee/dist/public`
- **Environment Variables**:
  - `PORT`: Defaults to 3000 (for development/preview servers)
  - `BASE_PATH`: Defaults to `/` (change if deploying to a subdirectory)

## Deployment Steps

### Using Vercel CLI

```bash
pnpm install -g vercel
vercel
```

### Using GitHub Integration

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the `vercel.json` configuration
3. Set environment variables in the Vercel dashboard if needed
4. Deploy on push to main branch

## Environment Variables

If you need to customize the deployment:

1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add any required environment variables
3. Redeploy

### Optional Environment Variables

- `BASE_PATH`: Set this if deploying to a subdirectory (e.g., `/app/` instead of `/`)
- `VITE_API_URL`: If you add API integration later, configure the API endpoint here

## Client-Side Routing

The `vercel.json` includes a rewrite rule that redirects all non-API routes to `index.html`, ensuring client-side routing works correctly for the SPA.

## Build Notes

- The build process uses `pnpm` workspaces
- Only the `@workspace/mazaj-coffee` package is built for deployment
- All build artifacts are placed in `artifacts/mazaj-coffee/dist/public`
- Environment variables like `BASE_PATH` are resolved during build time in the Vite config
