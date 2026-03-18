# BidFlow — System Architecture

## Overview

BidFlow is a multi-tenant SaaS procurement platform built as a modular monorepo.
Each layer is independently deployable and follows clear separation of concerns.

```
┌─────────────────────────────────────────────────────────┐
│                      CLIENTS                            │
│  Browser (Buyer Portal)   Browser (Supplier Portal)     │
└────────────────┬───────────────────┬────────────────────┘
                 │                   │
    ┌────────────▼───────────────────▼────────────┐
    │              Nginx Reverse Proxy             │
    │  app.bidflow.com  /  suppliers.bidflow.com  │
    └────────────┬───────────────────┬────────────┘
                 │                   │
    ┌────────────▼──────┐  ┌─────────▼────────────┐
    │  Next.js Web App  │  │ Next.js Supplier App  │
    │  (apps/web)       │  │ (apps/supplier-portal)│
    │  Port 3000        │  │ Port 3001             │
    └────────────┬──────┘  └─────────┬────────────┘
                 │                   │
    ┌────────────▼───────────────────▼────────────┐
    │              NestJS REST API                 │
    │              (apps/api)  Port 4000          │
    │  /api/v1 — JWT-protected, multi-tenant      │
    └────────────────────┬────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
    ┌────▼─────┐  ┌──────▼──────┐  ┌────▼───┐
    │PostgreSQL│  │   Redis     │  │Stripe  │
    │(Prisma)  │  │(cache/queue)│  │(billing│
    └──────────┘  └─────────────┘  └────────┘
```

## Layers

### Frontend Layer
- **apps/web** — Buyer portal (Next.js 14, App Router)
- **apps/supplier-portal** — Supplier portal (Next.js 14)
- State: TanStack Query (server state) + Zustand (client state)
- Forms: React Hook Form + Zod validation

### Backend API Layer
- **apps/api** — NestJS REST API
- Authentication: JWT (RS256), separate tokens for users vs suppliers
- Authorization: NestJS Guards + Role decorators (ADMIN/BUYER/APPROVER/SUPPLIER)
- All endpoints require `companyId` from JWT — enforces multi-tenancy

### Data Layer
- **PostgreSQL** via Prisma ORM
- All tables have `company_id` for tenant isolation
- Soft deletes via `is_active` flag
- Audit log for all mutations

### Analytics Layer
- **packages/analytics** — Shared scoring/calculation utilities
- Price intelligence tracked per item via `price_history` table
- Supplier scoring: `0.4×price + 0.3×delivery + 0.2×quality + 0.1×service`

## Multi-Tenancy Pattern

```typescript
// Every service method is scoped by companyId extracted from JWT
async findAll(companyId: string, query: ...) {
  return prisma.rfq.findMany({
    where: { companyId, ...otherFilters }
  });
}
```

## Auth Flow

```
User login → POST /auth/login
  → validate email + bcrypt password
  → return { accessToken (7d), refreshToken (30d), user }
  → frontend stores token in localStorage

Request → Authorization: Bearer <token>
  → JwtStrategy validates token
  → attaches user + companyId to request
  → RolesGuard checks role requirements
```

## RFQ Lifecycle

```
DRAFT → OPEN → ANALYSIS → CLOSED

DRAFT    : Created, items added, not visible to suppliers
OPEN     : Suppliers invited, bids accepted, deadline set
ANALYSIS : Bidding closed, buyer reviews comparison matrix
CLOSED   : Winner selected, PO generated
```
