'use client';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi, rfqsApi, ordersApi } from '@/lib/api';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { formatCurrency, formatDate } from '@/lib/utils';
import { TrendingUp, TrendingDown, Users, FileText, AlertCircle, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function StatCard({ label, value, sub, trend, icon: Icon, color }: {
  label: string; value: string | number; sub?: string; trend?: 'up' | 'down' | 'neutral';
  icon?: React.ElementType; color?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {sub && (
            <p className={`text-xs mt-1 flex items-center gap-1 ${trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
              {trend === 'up' && <TrendingUp size={12} />}
              {trend === 'down' && <TrendingDown size={12} />}
              {sub}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color || 'bg-slate-100 text-slate-500'}`}>
            <Icon size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { data: kpis }    = useQuery({ queryKey: ['dashboard'], queryFn: () => analyticsApi.dashboard().then(r => r.data) });
  const { data: rfqsData }= useQuery({ queryKey: ['rfqs', 'recent'], queryFn: () => rfqsApi.list({ page: 1, limit: 5, status: 'OPEN' }).then(r => r.data) });
  const { data: monthly } = useQuery({ queryKey: ['analytics', 'monthly'], queryFn: () => analyticsApi.monthly().then(r => r.data) });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Painel Principal" subtitle="Visão geral das suas operações de compras" />
        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Economia Total" value={formatCurrency(kpis?.totalSavings || 0, 'BRL')} sub={`${kpis?.totalSavingsPct || 0}% de saving`} trend="up" icon={DollarSign} color="bg-green-100 text-green-600" />
            <StatCard label="Fornecedores Ativos" value={kpis?.activeSuppliers || 0} icon={Users} color="bg-blue-100 text-blue-600" />
            <StatCard label="Cotações Abertas" value={kpis?.openRfqs || 0} sub="Aguardando propostas" icon={FileText} color="bg-purple-100 text-purple-600" />
            <StatCard label="Aprovações Pendentes" value={kpis?.pendingApprovals || 0} sub="Requer sua ação" trend="neutral" icon={AlertCircle} color="bg-amber-100 text-amber-600" />
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Economia vs Gasto (Mensal)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthly || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }}/>
                  <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={v => `${v/1000}K`}/>
                  <Tooltip formatter={(v: number) => formatCurrency(v, 'BRL')}/>
                  <Bar dataKey="totalSpend" name="Gasto" fill="#1e3a5f" radius={[3,3,0,0]}/>
                  <Bar dataKey="totalSavings" name="Economia" fill="#22c55e" radius={[3,3,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-4">Cotações Recentes</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-100 text-xs text-slate-500 uppercase">
                      <th className="pb-2 font-semibold">Cotação</th>
                      <th className="pb-2 font-semibold">Status</th>
                      <th className="pb-2 font-semibold">Prazo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rfqsData?.data?.slice(0, 5).map((rfq: any) => (
                      <tr key={rfq.id}>
                        <td className="py-3">
                          <span className="text-sm font-semibold text-slate-900 block">{rfq.number}</span>
                          <span className="text-xs text-slate-500">{rfq.title}</span>
                        </td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-[10px] font-bold rounded uppercase">{rfq.status}</span>
                        </td>
                        <td className="py-3 text-sm text-slate-600">{formatDate(rfq.deadline)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
