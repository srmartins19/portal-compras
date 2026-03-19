'use client';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi, rfqsApi, ordersApi } from '@/lib/api';
import { Topbar } from '@/components/layout/topbar';
import { formatCurrency, formatDate, getRfqStatusColor, getOrderStatusColor } from '@/lib/utils';
import { TrendingUp, TrendingDown, Users, FileText, ShoppingCart, Clock, DollarSign, AlertCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function StatCard({ label, value, sub, trend, icon: Icon, color }: {
  label: string; value: string; sub?: string; trend?: 'up' | 'down' | 'neutral';
  icon?: React.ElementType; color?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="
