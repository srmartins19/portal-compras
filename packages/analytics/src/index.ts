// BidFlow — Analytics utilities (shared between API and frontend)
// ================================================================

import { SCORING_WEIGHTS } from '@bidflow/config';

// ── Supplier Scoring Engine ───────────────────────────────────────
// Formula: 0.4 × price + 0.3 × delivery + 0.2 × quality + 0.1 × service

export interface ScoringInput {
  priceScore:    number;   // 0–10
  deliveryScore: number;   // 0–10
  qualityScore:  number;   // 0–10
  serviceScore:  number;   // 0–10
}

export function calculateSupplierScore(input: ScoringInput): number {
  const { price, delivery, quality, service } = SCORING_WEIGHTS;
  const score =
    input.priceScore    * price    +
    input.deliveryScore * delivery +
    input.qualityScore  * quality  +
    input.serviceScore  * service;
  return Math.round(score * 100) / 100;
}

// ── Price score from bid data ──────────────────────────────────────
// Price score: lower bid price relative to min = higher score
export function calculatePriceScore(bidPrice: number, minPrice: number): number {
  if (minPrice <= 0 || bidPrice <= 0) return 5;
  const score = (minPrice / bidPrice) * 10;
  return Math.min(10, Math.round(score * 100) / 100);
}

// ── Delivery score ─────────────────────────────────────────────────
// Fewer delivery days = higher score. Base: 5 days → 10.0; 50 days → 0
export function calculateDeliveryScore(deliveryDays: number): number {
  const score = Math.max(0, 10 - deliveryDays / 5);
  return Math.round(score * 100) / 100;
}

// ── Savings calculation ────────────────────────────────────────────
// savings = avgBidPrice - winnerBidPrice
export function calculateSavings(bids: number[], winnerPrice: number): {
  savings: number;
  savingsPct: number;
  avgPrice: number;
} {
  if (!bids.length) return { savings: 0, savingsPct: 0, avgPrice: 0 };
  const avgPrice = bids.reduce((s, p) => s + p, 0) / bids.length;
  const savings  = Math.max(0, avgPrice - winnerPrice);
  const savingsPct = avgPrice > 0 ? (savings / avgPrice) * 100 : 0;
  return {
    savings:     Math.round(savings * 100)     / 100,
    savingsPct:  Math.round(savingsPct * 100)  / 100,
    avgPrice:    Math.round(avgPrice * 100)    / 100,
  };
}

// ── Price trend detection ──────────────────────────────────────────
export function detectPriceTrend(
  prices: number[],
): 'UP' | 'DOWN' | 'STABLE' {
  if (prices.length < 2) return 'STABLE';
  const half    = Math.floor(prices.length / 2);
  const firstHalf  = prices.slice(0, half);
  const secondHalf = prices.slice(half);
  const firstAvg   = firstHalf.reduce((s, p) => s + p, 0) / firstHalf.length;
  const secondAvg  = secondHalf.reduce((s, p) => s + p, 0) / secondHalf.length;
  const changePct  = firstAvg > 0 ? ((secondAvg - firstAvg) / firstAvg) * 100 : 0;
  if (changePct > 2)  return 'UP';
  if (changePct < -2) return 'DOWN';
  return 'STABLE';
}

// ── Procurement cycle time ─────────────────────────────────────────
export function calcCycleTimeDays(rfqCreatedAt: Date, orderCreatedAt: Date): number {
  const ms   = orderCreatedAt.getTime() - rfqCreatedAt.getTime();
  const days = ms / (1000 * 60 * 60 * 24);
  return Math.round(days * 10) / 10;
}

// ── KPI formatting helpers ─────────────────────────────────────────
export function formatSavingsKpi(savings: number, locale = 'pt-BR', currency = 'BRL'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency, notation: 'compact' }).format(savings);
}
