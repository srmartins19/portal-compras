# BidFlow — Deployment Guide

## Local Development

### Prerequisites
- Node.js 20+
- Docker + Docker Compose
- npm 10+

### Quick start (with Docker)
```bash
# 1. Clone and install
git clone https://github.com/your-org/bidflow.git
cd bidflow
npm install

# 2. Start infrastructure
cd infra && docker-compose up postgres redis -d

# 3. Set up database
cp apps/api/.env.example apps/api/.env
# Edit DATABASE_URL if needed
npm run db:generate
npm run db:migrate
npm run db:seed

# 4. Start all apps
npm run dev
# API:              http://localhost:4000
# Buyer portal:     http://localhost:3000
# Supplier portal:  http://localhost:3001
# Swagger docs:     http://localhost:4000/api/docs
```

### Seed credentials
| Role     | Email                       | Password    |
|----------|-----------------------------|-------------|
| Admin    | admin@razzo.com.br          | admin123!   |
| Buyer    | comprador@razzo.com.br      | buyer123!   |
| Supplier | vendas@techsupply.com.br    | supplier123!|

## Production Deployment

### Environment variables (required)
```env
# apps/api/.env
DATABASE_URL=postgresql://user:pass@host:5432/bidflow_db
JWT_SECRET=<min 64 chars random string>
STRIPE_SECRET_KEY=sk_live_...
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=<sendgrid api key>

# apps/web/.env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1

# apps/supplier-portal/.env.local
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
```

### Docker Compose (full stack)
```bash
cd infra
JWT_SECRET=your-production-secret docker-compose up -d
```

### Vercel (frontend)
```bash
# Buyer portal
cd apps/web
vercel --prod

# Supplier portal
cd apps/supplier-portal
vercel --prod
```

### Render / Railway (API)
- Build command:  `npm run build`
- Start command:  `node dist/main`
- Health check:   `GET /api/v1/billing/plans`

### Database migrations (production)
```bash
# Run before deploying API
npm run db:migrate:prod
```

## Monitoring & Observability
- All API errors are logged with `Logger` (NestJS built-in)
- Audit logs stored in `audit_logs` table — query via `GET /audit`
- Add Sentry: `npm install @sentry/node` and initialize in `main.ts`
- Add Prometheus metrics via `@willsoto/nestjs-prometheus`
