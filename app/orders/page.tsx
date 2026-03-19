'use client';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ShoppingBag, ChevronRight } from 'lucide-react';

const mockOrders = [
  { id: 'PED-2026-042', fornecedor: 'TechCorp Brasil', valor: 145000, data: '2026-03-18T10:00:00Z', status: 'ABERTO' },
  { id: 'PED-2026-041', fornecedor: 'Distribuidora Nacional', valor: 25000, data: '2026-03-17T14:30:00Z', status: 'ENTREGUE' },
];

export default function OrdersPage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Pedidos de Compra" subtitle="Gestão de POs e acompanhamento de entregas" />
        <main className="flex-1 p-6 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase">
                  <th className="px-5 py-3">Número PO</th>
                  <th className="px-5 py-3">Fornecedor</th>
                  <th className="px-5 py-3">Valor Total</th>
                  <th className="px-5 py-3">Emissão</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockOrders.map((o) => (
                  <tr key={o.id} className="hover:bg-slate-50 cursor-pointer group">
                    <td className="px-5 py-4 font-semibold text-blue-600">{o.id}</td>
                    <td className="px-5 py-4 font-medium">{o.fornecedor}</td>
                    <td className="px-5 py-4 font-bold">{formatCurrency(o.valor, 'BRL')}</td>
                    <td className="px-5 py-4 text-sm text-slate-500">{formatDate(o.data)}</td>
                    <td className="px-5 py-4">
                      <span className="px-2 py-1 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100">{o.status}</span>
                    </td>
                    <td className="px-5 py-4"><ChevronRight className="text-slate-300 group-hover:text-blue-500" size={18}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
