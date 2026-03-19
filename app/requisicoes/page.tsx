'use client';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Plus, Search, Filter, ChevronRight, FileText } from 'lucide-react';

// Dados simulados locais para a página nascer a funcionar sem dependências externas
const mockRequisicoes = [
  { id: 'REQ-2026-089', solicitante: 'Ana Silva', departamento: 'Marketing', data: '2026-03-18T10:00:00Z', valor: 14500, status: 'PENDENTE', itens: 3, prioridade: 'ALTA' },
  { id: 'REQ-2026-088', solicitante: 'Carlos Souza', departamento: 'TI', data: '2026-03-17T14:30:00Z', valor: 45000, status: 'EM_COTACAO', itens: 15, prioridade: 'MÉDIA' },
  { id: 'REQ-2026-087', solicitante: 'Mariana Costa', departamento: 'RH', data: '2026-03-15T09:15:00Z', valor: 850, status: 'APROVADO', itens: 1, prioridade: 'BAIXA' },
  { id: 'REQ-2026-086', solicitante: 'João Pedro', departamento: 'Operações', data: '2026-03-10T16:45:00Z', valor: 120000, status: 'REJEITADO', itens: 4, prioridade: 'ALTA' },
  { id: 'REQ-2026-085', solicitante: 'Francisco Martins', departamento: 'Compras', data: '2026-03-09T11:20:00Z', valor: 3200, status: 'CONCLUIDO', itens: 2, prioridade: 'MÉDIA' },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    PENDENTE: 'bg-amber-100 text-amber-800 border-amber-200',
    APROVADO: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    EM_COTACAO: 'bg-blue-100 text-blue-800 border-blue-200',
    REJEITADO: 'bg-red-100 text-red-800 border-red-200',
    CONCLUIDO: 'bg-slate-100 text-slate-800 border-slate-200',
  };
  const labels: Record<string, string> = {
    PENDENTE: 'Aguardando Aprovação',
    APROVADO: 'Aprovado (Fila)',
    EM_COTACAO: 'Em Cotação',
    REJEITADO: 'Rejeitado',
    CONCLUIDO: 'Pedido Gerado',
  };
  return <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles[status] || styles.PENDENTE}`}>{labels[status] || status}</span>;
};

export default function RequisicoesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Requisições de Compra" subtitle="Gestão de pedidos internos e necessidades" />
        
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por ID, solicitante ou departamento..." 
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
                <Plus size={16} className="mr-2" /> Nova Requisição
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">ID da Req.</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Solicitante</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Itens</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor Estimado</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockRequisicoes.map((req) => (
                    <tr key={req.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-blue-600">
                            <FileText size={16} />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 text-sm">{req.id}</span>
                            {req.prioridade === 'ALTA' && <span className="ml-2 text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">URGENTE</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-900">{req.solicitante}</p>
                        <p className="text-xs text-slate-500">{req.departamento}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{formatDate(req.data)}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{req.itens} un.</td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-900">{formatCurrency(req.valor, 'BRL')}</td>
                      <td className="px-5 py-4">{getStatusBadge(req.status)}</td>
                      <td className="px-5 py-4 text-right">
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors ml-auto" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Footer */}
            <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <span className="text-xs text-slate-500">Mostrando <span className="font-medium text-slate-900">5</span> de <span className="font-medium text-slate-900">24</span> requisições</span>
              <div className="flex gap-1">
                <Button variant="secondary" size="sm" className="h-8 text-xs bg-white" disabled>Anterior</Button>
                <Button variant="secondary" size="sm" className="h-8 text-xs bg-white">Próximo</Button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
