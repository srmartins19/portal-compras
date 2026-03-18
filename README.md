<div align="center">
  <h1>🏭 BidFlow</h1>
  <p><strong>Strategic Sourcing & Reverse Auction SaaS Platform</strong></p>
  <p>
    <img src="https://img.shields.io/badge/Node.js-20+-brightgreen?logo=node.js" />
    <img src="https://img.shields.io/badge/NestJS-10-red?logo=nestjs" />
    <img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" />
    <img src="https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql" />
    <img src="https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma" />
    <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" />
  </p>
</div>

---

## 📦 What is BidFlow?

BidFlow is a **production-grade, multi-tenant SaaS procurement platform** designed for procurement teams in industrial and manufacturing companies.

**Core capabilities:**
- 📋 **RFQ Management** — Create, manage and track Request for Quotations
- 🏆 **Reverse Auctions** — Real-time competitive bidding engine
- 📊 **Bid Comparison Matrix** — Weighted scoring with savings calculation
- 🏢 **Supplier Portal** — Dedicated portal for supplier bid submission
- 💰 **Price Intelligence** — Historical price tracking per item
- 📈 **Procurement Analytics** — Spend analysis, savings, cycle time KPIs
- ✅ **Purchase Order Generation** — Automatic PO from winning bid

---

## 🏗️ Architecture

```
bidflow/
├── apps/
│   ├── web/                 ← Buyer portal     (Next.js 14)
│   ├── api/                 ← REST API         (NestJS)
│   └── supplier-portal/     ← Supplier portal  (Next.js 14)
├── packages/
│   ├── database/            ← Prisma schema + seed
│   ├── types/               ← Shared TypeScript types
│   ├── config/              ← Shared constants & config
│   └── analytics/           ← Scoring & calculation utilities
├── infra/
│   ├── docker-compose.yml
│   ├── Dockerfile.api
│   ├── Dockerfile.web
│   └── nginx.conf
└── docs/
    ├── architecture.md
    ├── database-schema.md
    ├── api.md
    └── deployment.md
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20+ and **npm** 10+
- **Docker** and **Docker Compose**

### 1. Clone and install

```bash
git clone https://github.com/your-org/bidflow.git
cd bidflow
npm install
```

### 2. Start infrastructure

```bash
cd infra
docker-compose up postgres redis -d
```

### 3. Configure environment

```bash
cp apps/api/.env.example apps/api/.env
# Edit DATABASE_URL, JWT_SECRET, SMTP settings
```

### 4. Set up database

```bash
npm run db:generate   # Generate Prisma client
npm run db:migrate    # Run migrations
npm run db:seed       # Load demo data
```

### 5. Start development

```bash
npm run dev
```

| Service          | URL                                  |
|------------------|--------------------------------------|
| Buyer Portal     | http://localhost:3000                |
| Supplier Portal  | http://localhost:3001                |
| API              | http://localhost:4000                |
| Swagger Docs     | http://localhost:4000/api/docs       |
| Prisma Studio    | `npm run db:studio`                  |

---

## 🔐 Demo Credentials

| Role     | Email                        | Password     |
|----------|------------------------------|--------------|
| Admin    | admin@razzo.com.br           | admin123!    |
| Buyer    | comprador@razzo.com.br       | buyer123!    |
| Supplier | vendas@techsupply.com.br     | supplier123! |

---

## 🛠️ Tech Stack

| Layer        | Technology                                      |
|-------------|--------------------------------------------------|
| Frontend     | Next.js 14 (App Router), TypeScript, TailwindCSS |
| State        | TanStack Query, Zustand                         |
| Forms        | React Hook Form + Zod                           |
| Charts       | Recharts                                        |
| Backend      | NestJS, TypeScript, Passport JWT                |
| Database     | PostgreSQL 16, Prisma ORM                       |
| Auth         | JWT (RS256), RBAC Guards                        |
| Billing      | Stripe (placeholder — ready to activate)        |
| Email        | Nodemailer (SMTP)                               |
| Build        | Turborepo monorepo                              |
| Deploy       | Vercel (frontend) + Docker/Railway (API)        |
| Proxy        | Nginx                                           |

---

## 📋 User Roles & Permissions

| Permission              | ADMIN | BUYER | APPROVER | SUPPLIER |
|------------------------|:-----:|:-----:|:--------:|:--------:|
| Create RFQ             |  ✅   |  ✅   |    ❌    |    ❌    |
| Invite Suppliers        |  ✅   |  ✅   |    ❌    |    ❌    |
| View Bid Comparison     |  ✅   |  ✅   |    ✅    |    ❌    |
| Select Winner           |  ✅   |  ✅   |    ✅    |    ❌    |
| Submit Bid             |  ❌   |  ❌   |    ❌    |    ✅    |
| Approve Orders         |  ✅   |  ❌   |    ✅    |    ❌    |
| Manage Users           |  ✅   |  ❌   |    ❌    |    ❌    |
| View Analytics         |  ✅   |  ✅   |    ✅    |    ❌    |

---

## 📊 Supplier Scoring Formula

```
supplier_score = 0.4 × price_score
               + 0.3 × delivery_score
               + 0.2 × quality_score
               + 0.1 × service_score
```

- **price_score** = `(min_bid_price / supplier_price) × 10`
- **delivery_score** = `max(0, 10 − delivery_days / 5)`
- Quality and service scores updated after order receipt

---

## 🔄 RFQ Workflow

```
DRAFT ──► OPEN ──► ANALYSIS ──► CLOSED
  │         │          │           │
Create   Invite      Review      Winner
 RFQ    Suppliers  Comparison   Selected
                    Matrix    → Generate PO
```

---

## 🌍 Environment Variables

### `apps/api/.env`

```env
DATABASE_URL="postgresql://bidflow:bidflow_pass@localhost:5432/bidflow_db"
JWT_SECRET="your-super-secret-min-64-chars"
JWT_EXPIRES_IN="7d"
PORT=4000
NODE_ENV=development
CORS_ORIGINS="http://localhost:3000,http://localhost:3001"
STRIPE_SECRET_KEY="sk_test_..."
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587
SMTP_USER="noreply@yourdomain.com"
SMTP_PASS="your-app-password"
```

### `apps/web/.env.local`

```env
NEXT_PUBLIC_API_URL="http://localhost:4000/api/v1"
```

---

## 🐳 Docker Deployment

```bash
cd infra
JWT_SECRET=your-production-secret docker-compose up -d
```

Services started:
- `bidflow_postgres` on port 5432
- `bidflow_redis` on port 6379
- `bidflow_api` on port 4000
- `bidflow_web` on port 3000
- `bidflow_supplier_portal` on port 3001
- `bidflow_nginx` on ports 80/443

---

## 📖 Documentation

| Document              | Path                          |
|-----------------------|-------------------------------|
| System Architecture   | [docs/architecture.md](docs/architecture.md) |
| Database Schema       | [docs/database-schema.md](docs/database-schema.md) |
| API Reference         | [docs/api.md](docs/api.md)   |
| Deployment Guide      | [docs/deployment.md](docs/deployment.md) |

---

## 🗺️ Roadmap

- [ ] Stripe billing integration (checkout + webhooks)
- [ ] Email notifications (RFQ invites, bid received, PO approved)
- [ ] Supplier self-registration flow
- [ ] PDF export (PO, bid comparison report)
- [ ] ERP integration adapters (SAP, TOTVS Datasul)
- [ ] Mobile-responsive improvements
- [ ] Webhook system for external integrations
- [ ] Advanced RFQ templates
- [ ] Two-factor authentication

---

## 📄 License

MIT — See [LICENSE](LICENSE) for details.

---

<div align="center">
  <p>Built with ❤️ for procurement teams</p>
</div>
