// BidFlow UI — Shared component primitives
// Used across web and supplier-portal
// =====================================================

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ── Status badge variants ──────────────────────────
export const rfqStatusVariant: Record<string, string> = {
  DRAFT:    'bg-slate-100 text-slate-600 border-slate-200',
  OPEN:     'bg-blue-100  text-blue-700  border-blue-200',
  ANALYSIS: 'bg-amber-100 text-amber-700 border-amber-200',
  CLOSED:   'bg-green-100 text-green-700 border-green-200',
};

export const orderStatusVariant: Record<string, string> = {
  DRAFT:            'bg-slate-100  text-slate-600  border-slate-200',
  PENDING_APPROVAL: 'bg-amber-100  text-amber-700  border-amber-200',
  APPROVED:         'bg-blue-100   text-blue-700   border-blue-200',
  SENT:             'bg-purple-100 text-purple-700 border-purple-200',
  RECEIVED:         'bg-green-100  text-green-700  border-green-200',
  CANCELLED:        'bg-red-100    text-red-700    border-red-200',
};

// ── Currency formatter ─────────────────────────────
export function formatCurrency(
  value: number,
  currency = 'BRL',
  locale   = 'pt-BR',
): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

// ── Date formatter ─────────────────────────────────
export function formatDate(
  date:   string | Date,
  locale  = 'pt-BR',
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short', year: 'numeric' },
): string {
  return new Intl.DateTimeFormat(locale, options).format(new Date(date));
}

// ── Truncate string ────────────────────────────────
export function truncate(str: string, max: number): string {
  return str.length > max ? str.slice(0, max) + '…' : str;
}

// ── Initials from name ─────────────────────────────
export function initials(name: string): string {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();
}

// ── Relative time ──────────────────────────────────
export function timeAgo(date: string | Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins  < 1)  return 'just now';
  if (mins  < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days  < 7)  return `${days}d ago`;
  return formatDate(date);
}

// ── Score color ────────────────────────────────────
export function scoreColor(score: number): string {
  if (score >= 8) return '#16a34a'; // green
  if (score >= 6) return '#d97706'; // amber
  return '#dc2626';                 // red
}
