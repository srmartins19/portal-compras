// BidFlow — Shared Types
// ================================================

export type { UserRole, RfqStatus, OrderStatus, BillingPlan, AuditAction } from '@prisma/client';

// ── API Response wrappers ──────────────────────
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T = unknown> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  message: string | string[];
  error?: string;
  timestamp: string;
  path: string;
}

// ── Auth ──────────────────────────────────────
export interface JwtPayload {
  sub: string;        // userId
  email: string;
  companyId: string;
  role: string;
  type: 'user' | 'supplier';
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ── Bid Comparison Matrix ─────────────────────
export interface BidComparisonRow {
  supplierId: string;
  supplierName: string;
  totalPrice: number;
  currency: string;
  deliveryDays: number;
  paymentTerms: string | null;
  warranty: string | null;
  score: number;
  ranking: number;
  savingsVsAverage: number;
  savingsPct: number;
  items: BidComparisonItem[];
}

export interface BidComparisonItem {
  rfqItemId: string;
  itemName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
  isBestPrice: boolean;
}

// ── Price Intelligence ────────────────────────
export interface PriceIntelligence {
  itemId: string;
  itemName: string;
  currency: string;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  lastPrice: number;
  priceTrend: 'UP' | 'DOWN' | 'STABLE';
  trendPct: number;
  dataPoints: PriceDataPoint[];
}

export interface PriceDataPoint {
  date: string;
  price: number;
  supplierId: string;
  supplierName: string;
  rfqId?: string;
}

// ── Analytics Dashboard ───────────────────────
export interface DashboardMetrics {
  totalSavings: number;
  totalSavingsPct: number;
  activeSuppliers: number;
  rfqsThisMonth: number;
  openRfqs: number;
  avgCycleTimeDays: number;
  totalSpendMtd: number;
  pendingApprovals: number;
}

export interface MonthlyMetric {
  month: string;
  rfqsCreated: number;
  ordersCreated: number;
  totalSpend: number;
  totalSavings: number;
  avgCycleTimeDays: number;
}

// ── Supplier Scoring ──────────────────────────
export interface SupplierScore {
  supplierId: string;
  supplierName: string;
  overallScore: number;
  deliveryScore: number;
  qualityScore: number;
  priceScore: number;
  serviceScore: number;
  totalOrders: number;
  ranking: number;
}

// ── Pagination & Filters ──────────────────────
export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

export interface RfqFilters extends PaginationQuery {
  status?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface OrderFilters extends PaginationQuery {
  status?: string;
  supplierId?: string;
}
