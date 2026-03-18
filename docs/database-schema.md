# BidFlow — Database Schema

## Entity Relationship Summary

```
companies (tenant root)
  ├── users           (company employees: ADMIN/BUYER/APPROVER)
  ├── suppliers       (external vendors, portal access)
  ├── items           (procurement catalog)
  ├── rfqs            (requests for quotation)
  │   ├── rfq_items   (line items per RFQ)
  │   └── rfq_suppliers (invited suppliers)
  ├── bids            (supplier proposals)
  │   └── bid_items   (unit prices per RFQ item)
  ├── orders          (purchase orders)
  ├── audit_logs      (immutable action trail)
  └── procurement_metrics (monthly KPI snapshots)

price_history         (item price over time — cross-tenant analytics)
supplier_performance  (scoring per supplier)
```

## Key Design Decisions

### Multi-tenancy
- Every row links to `company_id`
- All Prisma queries are wrapped with `WHERE company_id = $1`
- Suppliers belong to a company but have their own portal login

### RFQ → Order flow
1. Buyer creates RFQ with items → status: DRAFT
2. RFQ opened → suppliers invited → status: OPEN
3. Suppliers submit bids via portal
4. Buyer reviews comparison matrix → status: ANALYSIS
5. Winner selected → `bid.is_winner = true` → status: CLOSED
6. `POST /orders/generate-from-rfq/:rfqId` → creates PO from winner bid

### Price History
- Every bid submission records price per item in `price_history`
- Used by Analytics module for price intelligence (avg/min/max/trend)

### Supplier Performance
- Updated on order RECEIVED status
- `overall_score = 0.4×price + 0.3×delivery + 0.2×quality + 0.1×service`

## Index Strategy
- `(company_id)` on all main tables
- `(company_id, status)` on rfqs and orders
- `(item_id, date)` on price_history for time-series queries
- `(rfq_id, supplier_id)` unique on bids
