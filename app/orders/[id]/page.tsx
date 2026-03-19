'use client';
import { useQuery } from '@tanstack/react-query';
import { ordersApi } from '@/lib/api';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const { data: order } = useQuery({ queryKey: ['order', params.id], queryFn: () => ordersApi.get(params.id).then(r => r.data) });
  if (!order) return null;
  const o = order as any;
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar /><div className="flex-1 ml-64 flex flex-col">
        <Topbar title={`Pedido ${o.number || ''}`} />
        <main className="p-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Detalhes do Pedido</h2>
            <p><strong>Fornecedor:</strong> {o.supplier?.name}</p>
            <p><strong>Pagamento:</strong> {o.paymentTerms || 'Padrão ERP'}</p>
            <p><strong>Total:</strong> {formatCurrency(o.totalAmount || 0, 'BRL')}</p>
          </div>
        </main>
      </div>
    </div>
  );
}
