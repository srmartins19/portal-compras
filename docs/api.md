# BidFlow API — Endpoint Reference

Base URL: `http://localhost:4000/api/v1`
Swagger UI: `http://localhost:4000/api/docs` (development only)

All endpoints (except auth) require:
```
Authorization: Bearer <accessToken>
```

## Auth

| Method | Path                    | Description              |
|--------|-------------------------|--------------------------|
| POST   | /auth/login             | User login               |
| POST   | /auth/register          | Register company + admin |
| POST   | /auth/supplier/login    | Supplier portal login    |

## RFQs

| Method | Path                              | Roles                | Description           |
|--------|-----------------------------------|----------------------|-----------------------|
| GET    | /rfqs                             | All                  | List RFQs (paginated) |
| POST   | /rfqs                             | ADMIN, BUYER         | Create RFQ            |
| GET    | /rfqs/:id                         | All                  | Get RFQ detail        |
| PATCH  | /rfqs/:id/status                  | ADMIN, BUYER         | Update status         |
| POST   | /rfqs/:id/invite-suppliers        | ADMIN, BUYER         | Invite suppliers      |
| GET    | /rfqs/:id/comparison              | All                  | Bid comparison matrix |
| POST   | /rfqs/:id/select-winner           | ADMIN, BUYER, APPROVER | Select winner       |

## Bids

| Method | Path                   | Roles    | Description         |
|--------|------------------------|----------|---------------------|
| POST   | /rfqs/:rfqId/bids      | SUPPLIER | Submit/update bid   |
| GET    | /rfqs/:rfqId/bids      | All      | List bids for RFQ   |

## Orders

| Method | Path                                 | Roles                  | Description             |
|--------|--------------------------------------|------------------------|-------------------------|
| GET    | /orders                              | All                    | List POs (paginated)    |
| POST   | /orders/generate-from-rfq/:rfqId     | ADMIN, BUYER           | Generate PO from winner |
| PATCH  | /orders/:id/status                   | ADMIN, BUYER, APPROVER | Update status           |

## Analytics

| Method | Path                                  | Description                   |
|--------|---------------------------------------|-------------------------------|
| GET    | /analytics/dashboard                  | KPI dashboard                 |
| GET    | /analytics/item-price-history/:itemId | Price intelligence            |
| GET    | /analytics/supplier-ranking           | Supplier scores & ranking     |
| GET    | /analytics/monthly?months=12          | Monthly metrics               |
| GET    | /analytics/supplier-participation     | Bid participation rate        |

## Suppliers

| Method | Path                       | Roles        | Description      |
|--------|----------------------------|--------------|------------------|
| GET    | /suppliers                 | All          | List suppliers   |
| POST   | /suppliers                 | ADMIN, BUYER | Create supplier  |
| PATCH  | /suppliers/:id/approve     | ADMIN        | Approve supplier |

## Bid Comparison Matrix — Response Schema

```json
[
  {
    "supplierId":      "cuid",
    "supplierName":    "TechSupply LTDA",
    "totalPrice":      12500.00,
    "currency":        "BRL",
    "deliveryDays":    15,
    "paymentTerms":    "30 days net",
    "score":           8.72,
    "ranking":         1,
    "savingsVsAverage": 1500.00,
    "savingsPct":      10.71,
    "items": [
      {
        "rfqItemId":   "cuid",
        "itemName":    "Notebook Dell i7",
        "quantity":    5,
        "unit":        "UN",
        "unitPrice":   2500.00,
        "totalPrice":  12500.00,
        "isBestPrice": true
      }
    ]
  }
]
```
