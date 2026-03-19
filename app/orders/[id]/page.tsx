'use client';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { formatCurrency, formatDate } from '@/lib/utils';
import { ShoppingBag } from 'lucide-react';

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { data: order, isLoading } = useQuery({
    queryKey: ['order', params.id],
    queryFn: () => ordersApi.get(params.id).then(r => r.data)
  });

  if (isLoading || !order) return <div className="p-10 text-center text-slate-500">Carregando Pedido...</div>;

  const o = order as any; // Blindagem técnica contra erros de tipagem

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col text-slate-900">
        <Topbar title={`Pedido ${o.number || o.id}`} subtitle="Visualização de Ordem de Compra" />
        <main className="flex-1 p-6 max-w-4xl mx-auto w-full">
          <div className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm space-y-8">
            <div className="flex justify-between items-start border-b border-slate-100 pb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center"><ShoppingBag /></div>
                <div><h2 className="text-xl font-bold">{o.number || o.id}</h2><p className="text-sm text-slate-500">Emissão: {formatDate(o.createdAt)}</p></div>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold uppercase">{o.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-wider">Dados do Pedido</h4>
                <p className="mb-2"><strong>Condição de Pagto:</strong> {o.paymentTerms || 'Consultar ERP Datasul'}</p>
                <p><strong>Valor Total:</strong> {formatCurrency(o.totalAmount, o.currency || 'BRL')}</p>
              </div>
              <div>
                <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-wider">Fornecedor</h4>
                <p className="font-bold">{o.supplier?.name || 'Não informado'}</p>
                <p className="text-slate-500">{o.supplier?.email}</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
