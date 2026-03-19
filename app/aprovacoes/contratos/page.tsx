'use client';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search, Filter, FileSignature, AlertCircle, CheckCircle, XCircle, ChevronRight, FileText } from 'lucide-react';

const mockContratos = [
  { id: 'CTR-2026-001', titulo: 'Acordo Marco - Equipamentos TI', fornecedor: 'TechCorp Brasil', valorGlobal: 1200000, inicio: '2025-03-18T00:00:00Z', fim: '2027-03-18T00:00:00Z', status: 'ATIVO' },
  { id: 'CTR-2026-002', titulo: 'Fornecimento Contínuo - Escritório', fornecedor: 'Distribuidora Nacional', valorGlobal: 250000, inicio: '2025-04-10T00:00:00Z', fim: '2026-04-10T00:00:00Z', status: 'VENCENDO' },
  { id: 'CTR-2025-089', titulo: 'Operação Logística SP', fornecedor: 'Logística Express', valorGlobal: 850000, inicio: '2024-01-01T00:00:00Z', fim: '2025-12-31T00:00:00Z', status: 'VENCIDO' },
  { id: 'CTR-2026-005', titulo: 'Licenciamento de Software ERP', fornecedor: 'CloudSystems Inc', valorGlobal: 450000, inicio: '2026-01-01T00:00:00Z', fim: '2029-01-01T00:00:00Z', status: 'ATIVO' },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    ATIVO: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    VENCENDO: 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse',
    VENCIDO: 'bg-red-50 text-red-700 border-red-200',
  };
  const icons: Record<string, any> = {
    ATIVO: <CheckCircle size={12} className="mr-1" />,
    VENCENDO: <AlertCircle size={12} className="mr-1" />,
    VENCIDO: <XCircle size={12} className="mr-1" />,
  };
  return (
    <span className={`flex items-center w-max px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles[status]}`}>
      {icons[status]} {status === 'VENCENDO' ? 'VENCE EM < 30 DIAS' : status}
    </span>
  );
};

export default function ContratosPage() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Gestão de Contratos" subtitle="Repositório de acordos, vigências e aditivos" />
        
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Mini Dashboard de Contratos */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center"><CheckCircle size={24} /></div>
              <div><p className="text-sm text-slate-500 font-medium">Contratos Ativos</p><p className="text-2xl font-bold text-slate-900">24</p></div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm flex items-center gap-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500"></div>
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center"><AlertCircle size={24} /></div>
              <div><p className="text-sm text-slate-500 font-medium">Vencendo (Próx. 30 dias)</p><p className="text-2xl font-bold text-slate-900">1</p></div>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"><FileSignature size={24} /></div>
              <div><p className="text-sm text-slate-500 font-medium">Valor Total Contratado</p><p className="text-2xl font-bold text-slate-900">R$ 2.7M</p></div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar contrato ou fornecedor..." 
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
                <FileSignature size={16} className="mr-2" /> Novo Contrato
              </Button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Contrato</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fornecedor</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor Global</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vigência Fim</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockContratos.map((ctr) => (
                    <tr key={ctr.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-600">
                            <FileText size={16} />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 text-sm">{ctr.id}</span>
                            <p className="text-xs text-slate-500 truncate max-w-[200px]">{ctr.titulo}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-900">{ctr.fornecedor}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">{formatCurrency(ctr.valorGlobal, 'BRL')}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{formatDate(ctr.fim)}</td>
                      <td className="px-5 py-4">{getStatusBadge(ctr.status)}</td>
                      <td className="px-5 py-4 text-right">
                        <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors ml-auto" />
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
