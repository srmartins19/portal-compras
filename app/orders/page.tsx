'use client';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { 
  Search, Filter, ShoppingBag, FileText, 
  Printer, Truck, CheckCircle, Clock, ChevronRight 
} from 'lucide-react';

// Dados simulados de pedidos já integrados ou gerados no portal
const mockOrders = [
  { id: 'PED-2026-042', rfqId: 'COT-2026-001', fornecedor: 'TechCorp Brasil', valor: 145000, data: '2026-03-18T10:00:00Z', entrega: '2026-04-05T00:00:00Z', status: 'ABERTO', itens: 2 },
  { id: 'PED-2026-041', rfqId: 'COT-2026-002', fornecedor: 'Distribuidora Nacional', valor: 25000, data: '2026-03-17T14:30:00Z', entrega: '2026-03-25T00:00:00Z', status: 'ENTREGUE', itens: 1 },
  { id: 'PED-2026-040', rfqId: 'COT-2026-005', fornecedor: 'Logística Express', valor: 12500, data: '2026-03-15T09:15:00Z', entrega: '2026-03-20T00:00:00Z', status: 'EM_TRANSITO', itens: 1 },
  { id: 'PED-2026-039', rfqId: 'COT-2025-098', fornecedor: 'Papelaria Central', valor: 1200, data: '2026-03-10T11:00:00Z', entrega: '2026-03-12T00:00:00Z', status: 'CANCELADO', itens: 5 },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    ABERTO: 'bg-blue-50 text-blue-700 border-blue-200',
    ENTREGUE: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    EM_TRANSITO: 'bg-purple-50 text-purple-700 border-purple-200',
    CANCELADO: 'bg-red-50 text-red-700 border-red-200',
  };
  const labels: Record<string, string> = {
    ABERTO: 'Confirmado',
    ENTREGUE: 'Recebido Total',
    EM_TRANSITO: 'Em Transporte',
    CANCELADO: 'Cancelado',
  };
  return <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${styles[status]}`}>{labels[status] || status}</span>;
};

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Pedidos de Compra (PO)" subtitle="Acompanhamento de ordens enviadas aos fornecedores" />
        
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por Pedido, Fornecedor ou Cotação..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-700 border-0">
                <Filter size={16} className="mr-2" /> Filtros
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Printer size={16} className="mr-2" /> Relatório Semanal
              </Button>
            </div>
          </div>

          {/* Grid de Cards de Resumo */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 text-blue-600 mb-2">
                <ShoppingBag size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Abertos</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">12</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 text-purple-600 mb-2">
                <Truck size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Em Trânsito</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">5</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 text-emerald-600 mb-2">
                <CheckCircle size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Entregues</span>
              </div>
              <p className="text-2xl font-bold text-slate-900">84</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 text-amber-600 mb-2">
                <Clock size={20} />
                <span className="text-xs font-bold uppercase tracking-wider">Atrasados</span>
              </div>
              <p className="text-2xl font-bold text-slate-900 text-red-600">2</p>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nº Pedido</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fornecedor</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor Total</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data Emissão</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Previsão Entrega</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                            <ShoppingBag size={16} />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 text-sm">{order.id}</span>
                            <p className="text-[10px] text-slate-400 font-mono">{order.rfqId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-900">{order.fornecedor}</p>
                        <p className="text-xs text-slate-500">{order.itens} itens</p>
                      </td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-900">{formatCurrency(order.valor, 'BRL')}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{formatDate(order.data)}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{formatDate(order.entrega)}</td>
                      <td className="px-5 py-4">{getStatusBadge(order.status)}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500" title="Imprimir PDF">
                            <Printer size={16} />
                          </button>
                          <ChevronRight size={18} className="text-slate-300" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
