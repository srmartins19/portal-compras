// BidFlow — Frontend Types (standalone, no external workspace deps)

export type UserRole    = 'ADMIN' | 'BUYER' | 'APPROVER' | 'SUPPLIER';
export type RfqStatus   = 'DRAFT' | 'OPEN'  | 'ANALYSIS' | 'CLOSED';
export type OrderStatus = 'DRAFT' | 'PENDING_APPROVAL' | 'APPROVED' | 'SENT' | 'RECEIVED' | 'CANCELLED';
export type BillingPlan = 'BASIC' | 'PRO'   | 'ENTERPRISE';

export interface ApiResponse<T = unknown> {
  data:       T;
  message?:   string;
  timestamp:  string;
}

export interface PaginatedResponse<T = unknown> {
  data:        T[];
  total:       number;
  page:        number;
  limit:       number;
  totalPages:  number;
}

export interface BidComparisonRow {
  supplierId:       string;
  supplierName:     string;
  totalPrice:       number;
  currency:         string;
  deliveryDays:     number;
  paymentTerms:     string | null;
  warranty:         string | null;
  score:            number;
  ranking:          number;
  savingsVsAverage: number;
  savingsPct:       number;
  items:            BidComparisonItem[];
}

export interface BidComparisonItem {
  rfqItemId:    string;
  itemName:     string;
  quantity:     number;
  unit:         string;
  unitPrice:    number;
  totalPrice:   number;
  isBestPrice:  boolean;
}

export interface PriceIntelligence {
  itemId:     string;
  itemName:   string;
  currency:   string;
  avgPrice:   number;
  minPrice:   number;
  maxPrice:   number;
  lastPrice:  number;
  priceTrend: 'UP' | 'DOWN' | 'STABLE';
  trendPct:   number;
  dataPoints: PriceDataPoint[];
}

export interface PriceDataPoint {
  date:         string;
  price:        number;
  supplierId:   string;
  supplierName: string;
  rfqId?:       string;
}

export interface DashboardMetrics {
  totalSavings:      number;
  totalSavingsPct:   number;
  activeSuppliers:   number;
  rfqsThisMonth:     number;
  openRfqs:          number;
  avgCycleTimeDays:  number;
  totalSpendMtd:     number;
  pendingApprovals:  number;
}

export interface MonthlyMetric {
  month:           string;
  rfqsCreated:     number;
  ordersCreated:   number;
  totalSpend:      number;
  totalSavings:    number;
  avgCycleTimeDays:number;
}

export interface SupplierScore {
  supplierId:    string;
  supplierName:  string;
  overallScore:  number;
  deliveryScore: number;
  qualityScore:  number;
  priceScore:    number;
  serviceScore:  number;
  totalOrders:   number;
  ranking:       number;
}
