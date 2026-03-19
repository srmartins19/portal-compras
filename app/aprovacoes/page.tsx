'use client';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CheckCircle, XCircle, Clock, FileText, Filter, Eye } from 'lucide-react';

// Dados simulados com foco exclusivo na operação de Compras
const mockAprovacoes = [
  { id: 'PED-2026-042', tipo: 'Pedido de Compra', comprador: 'Ana Silva', data: '2026-03-18T09:15:00Z', valor: 145000, fornecedor: 'TechCorp Brasil', alcada: 'DIRETORIA', status: 'PENDENTE' },
  { id: 'COT-2026-002', tipo: 'Fechamento de Cotação', comprador: 'Francisco Martins', data: '2026-03-18T10:30:00Z', valor: 45000, fornecedor: 'Distribuidora Nacional', alcada: 'GERÊNCIA', status: 'PENDENTE' },
  { id: 'COT-2026-005', tipo: 'Fechamento de Cotação', comprador: 'Carlos Souza', data: '2026-03-17T16:45:00Z', valor: 12500, fornecedor: 'Logística Express', alcada: 'COORDENAÇÃO', status: 'PENDENTE' },
];

const getAlcadaBadge = (alcada: string) => {
  const styles: Record<string, string> = {
    'COORDENAÇÃO': 'bg-blue-50 text-blue-700 border-blue-200',
    'GERÊNCIA': 'bg-purple-50 text-purple-700 border-purple-200',
    'DIRETORIA': 'bg-amber-50 text-amber-800 border-amber-200',
  };
  return <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${styles[alcada]}`}>{alcada}</span>;
};

export default function AprovacoesPage() {
  const [aprovacoes, setAprovacoes] = useState(mockAprovacoes);

  const handleAction = (id: string, action: 'approve' | 'reject') => {
    // Ação simulada: remove o item da lista ao aprovar ou rejeitar
    setAprovacoes(prev => prev.filter(item => item.id !== id));
    alert(`${action === 'approve' ? 'Aprovado' : 'Rejeitado'} com sucesso! (Simulação)`);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Aprovações de Compras" subtitle="Fila de liberação de cotações e pedidos (Alçadas internas)" />
        
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Header Actions */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-amber-500" />
              <h2 className="font-semibold text-slate-900">Aguardando sua ação</h2>
              <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-bold px-2 py-0.5 rounded-full">{aprovacoes.length}</span>
            </div>
            <Button variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-700 border-0">
              <Filter size={16} className="mr-2" /> Filtrar
            </Button>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              {aprovacoes.length === 0 ? (
                <div className="p-12 text-center flex flex-col items-center">
                  <CheckCircle size={48} className="text-emerald-400 mb-4" />
                  <h3 className="text-lg font-semibold text-slate-900">Tudo limpo por aqui!</h3>
                  <p className="text-sm text-slate-500 mt-1">Nenhum documento aguardando a sua aprovação no momento.</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Documento</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Comprador</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fornecedor</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Alçada Exigida</th>
                      <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {aprovacoes.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                              <FileText size={16} />
                            </div>
                            <div>
                              <span className="font-semibold text-slate-900 text-sm block">{item.id}</span>
                              <span className="text-xs text-slate-500">{item.tipo}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-slate-900">{item.comprador}</p>
                          <p className="text-xs text-slate-500">{formatDate(item.data)}</p>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-700 font-medium">
                          {item.fornecedor}
                        </td>
                        <td className="px-5 py-4 text-sm font-bold text-slate-900">
                          {formatCurrency(item.valor, 'BRL')}
                        </td>
                        <td className="px-5 py-4">
                          {getAlcadaBadge(item.alcada)}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              title="Visualizar Detalhes"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                              <Eye size={18} />
                            </button>
                            <button 
                              onClick={() => handleAction(item.id, 'reject')}
                              title="Rejeitar"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                              <XCircle size={18} />
                            </button>
                            <button 
                              onClick={() => handleAction(item.id, 'approve')}
                              title="Aprovar"
                              className="w-8 h-8 rounded-lg flex items-center justify-center text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-colors">
                              <CheckCircle size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
