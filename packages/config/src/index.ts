// BidFlow — Shared configuration
// ================================================

export const BILLING_PLANS = {
  BASIC: {
    id:             'BASIC',
    name:           'Basic',
    priceMonthly:   0,
    priceYearly:    0,
    rfqLimit:       10,
    supplierLimit:  20,
    userLimit:      3,
    features:       ['10 RFQs/month', '20 suppliers', '3 users', 'Email support'],
  },
  PRO: {
    id:             'PRO',
    name:           'Pro',
    priceMonthly:   299,
    priceYearly:    2990,
    rfqLimit:       100,
    supplierLimit:  200,
    userLimit:      15,
    features:       ['100 RFQs/month', '200 suppliers', '15 users', 'Reverse auctions', 'Analytics', 'Priority support'],
  },
  ENTERPRISE: {
    id:             'ENTERPRISE',
    name:           'Enterprise',
    priceMonthly:   999,
    priceYearly:    9990,
    rfqLimit:       -1,       // unlimited
    supplierLimit:  -1,
    userLimit:      -1,
    features:       ['Unlimited RFQs', 'Unlimited suppliers', 'Unlimited users', 'Custom integrations', 'Dedicated CSM', 'SLA guarantee'],
  },
} as const;

export const RFQ_STATUS_LABELS: Record<string, string> = {
  DRAFT:    'Draft',
  OPEN:     'Open',
  ANALYSIS: 'In Analysis',
  CLOSED:   'Closed',
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  DRAFT:            'Draft',
  PENDING_APPROVAL: 'Pending Approval',
  APPROVED:         'Approved',
  SENT:             'Sent to Supplier',
  RECEIVED:         'Received',
  CANCELLED:        'Cancelled',
};

export const CURRENCIES = ['BRL', 'USD', 'EUR', 'GBP', 'ARS', 'CLP', 'COP', 'PEN'] as const;

export const UNITS = ['UN', 'KG', 'G', 'L', 'ML', 'M', 'M2', 'M3', 'CX', 'PC', 'PAR', 'H', 'DIA'] as const;

export const ITEM_CATEGORIES = [
  'MRO',
  'TI & Tecnologia',
  'Serviços',
  'Logística',
  'Equipamentos',
  'Material de Escritório',
  'Matéria-Prima',
  'Embalagem',
  'Manutenção',
  'RH & Benefícios',
  'Marketing',
  'Jurídico',
  'Outros',
] as const;

// Supplier scoring weights (must sum to 1.0)
export const SCORING_WEIGHTS = {
  price:    0.4,
  delivery: 0.3,
  quality:  0.2,
  service:  0.1,
} as const;

// API config
export const API_CONFIG = {
  defaultPageSize: 20,
  maxPageSize:     100,
  jwtExpiresIn:   '7d',
  refreshExpiresIn: '30d',
} as const;
