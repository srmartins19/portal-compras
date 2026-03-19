'use client';
import { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search, Filter, Receipt, AlertTriangle, CheckCircle, FileText, ChevronDown, ChevronUp, Clock } from 'lucide-react';

// Simulador de Notas Fiscais (PDF lido por OCR) cruzadas com o Pedido de Compra
const mockNotas = [
  { 
    id: 'NF-89450', poNumber: 'PED-2026-042', fornecedor: 'TechCorp Brasil', emissao: '2026-03-18T10:00:00Z', valorTotal: 160000, 
    status: 'DIVERGENTE', motivo: 'Quantidade faturada maior que o pedido',
    itens: [
      { nome: 'Notebook Dell Latitude 7420', pedidoQtd: 20, notaQtd: 22, pedidoPreco: 7500, notaPreco: 7500, status: 'DIVERGENTE_QTD' },
      { nome: 'Monitor Dell 27"', pedidoQtd: 20, notaQtd: 20, pedidoPreco: 500, notaPreco: 500, status: 'VALIDADO' }
    ]
  },
  { 
    id: 'NF-11203', poNumber: 'PED-2026-041', fornecedor: 'Distribuidora Nacional', emissao: '2026-03-17T14:30:00Z', valorTotal: 25000, 
    status: 'VALIDADA', motivo: null,
    itens: [
      { nome: 'Cadeira Ergonômica', pedidoQtd: 50, notaQtd: 50, pedidoPreco: 500, notaPreco: 500, status: 'VALIDADO' }
    ]
  },
  { 
    id: 'NF-00982', poNumber: 'PED-2026-039', fornecedor: 'Logística Express', emissao: '2026-03-15T09:15:00Z', valorTotal: 13500, 
    status: 'DIVERGENTE', motivo: 'Divergência de preço unitário',
    itens: [
      { nome: 'Serviço de Frete SP', pedidoQtd: 1, notaQtd: 1, pedidoPreco: 12000, notaPreco: 13500, status: 'DIVERGENTE_PRECO' }
    ]
  },
  { 
    id: 'NF-55410', poNumber: 'PED-2026-045', fornecedor: 'CloudSystems Inc', emissao: '2026-03-18T16:45:00Z', valorTotal: 45000, 
    status: 'PROCESSANDO', motivo: 'Aguardando leitura OCR do PDF',
    itens: []
  },
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    VALIDADA: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    DIVERGENTE: 'bg-red-50 text-red-700 border-red-200',
    PROCESSANDO: 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse',
  };
  const icons: Record<string, any> = {
    VALIDADA: <CheckCircle size={12} className="mr-1" />,
    DIVERGENTE: <AlertTriangle size={12} className="mr-1" />,
    PROCESSANDO: <Clock size={12} className="mr-1" />,
  };
  return (
    <span className={`flex items-center w-max px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles[status]}`}>
      {icons[status]} {status === 'PROCESSANDO' ? 'LENDO PDF...' : status}
    </span>
  );
};

export default function NotasFiscaisPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Validação de Notas Fiscais (PDF)" subtitle="2-way match automático entre Pedido e NFe" />
        
        <main className="flex-1 p-6 max-w-7xl mx-auto w-full space-y-6">
          
          {/* Dashboard Resumo */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-xs text-slate-500 font-medium uppercase">Total Recebidas</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">142</p>
              <p className="text-xs text-slate-400 mt-1">Este mês</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-t-4 border-t-emerald-500 shadow-sm">
              <p className="text-xs text-emerald-600 font-medium uppercase">Validadas (Match Perfeito)</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">128</p>
              <p className="text-xs text-slate-400 mt-1">Liberadas para pagamento</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-t-4 border-t-red-500 shadow-sm">
              <p className="text-xs text-red-600 font-medium uppercase">Com Divergência</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">11</p>
              <p className="text-xs text-slate-400 mt-1">Requerem sua ação</p>
            </div>
            <div className="bg-white p-4 rounded-xl border-t-4 border-t-amber-500 shadow-sm">
              <p className="text-xs text-amber-600 font-medium uppercase">Em Processamento (IA)</p>
              <p className="text-2xl font-bold text-slate-900 mt-1">3</p>
              <p className="text-xs text-slate-400 mt-1">Lendo PDFs anexados...</p>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Buscar por NFe, Pedido ou Fornecedor..." 
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="secondary" className="bg-slate-100 hover:bg-slate-200 text-slate-700 border-0">
              <Filter size={16} className="mr-2" /> Filtrar Divergências
            </Button>
          </div>

          {/* Tabela de NFs */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nota Fiscal / PDF</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Pedido Linkado</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fornecedor</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Valor NF</th>
                  <th className="px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status da Validação</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockNotas.map((nota) => (
                  <React.Fragment key={nota.id}>
                    <tr 
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${expandedId === nota.id ? 'bg-slate-50' : ''}`}
                      onClick={() => nota.itens.length > 0 && toggleExpand(nota.id)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-red-500">
                            <FileText size={16} />
                          </div>
                          <span className="font-semibold text-slate-900 text-sm">{nota.id}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm font-medium text-blue-600 hover:underline">{nota.poNumber}</td>
                      <td className="px-5 py-4 text-sm font-medium text-slate-900">{nota.fornecedor}</td>
                      <td className="px-5 py-4 text-sm font-bold text-slate-900">{formatCurrency(nota.valorTotal, 'BRL')}</td>
                      <td className="px-5 py-4">
                        {getStatusBadge(nota.status)}
                        {nota.motivo && <p className="text-[10px] text-red-500 mt-1 max-w-[200px] truncate">{nota.motivo}</p>}
                      </td>
                      <td className="px-5 py-4 text-right">
                        {nota.itens.length > 0 && (
                          <button className="text-slate-400 hover:text-slate-600">
                            {expandedId === nota.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                        )}
                      </td>
                    </tr>
                    
                    {/* Linha Expandida: Comparação Item a Item */}
                    {expandedId === nota.id && (
                      <tr>
                        <td colSpan={6} className="bg-slate-50 p-0 border-b border-slate-200">
                          <div className="px-8 py-4 border-l-4 border-l-blue-500">
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">Cruzamento de Itens: Nota Fiscal vs Pedido</h4>
                            <table className="w-full bg-white border border-slate-200 rounded-lg overflow-hidden">
                              <thead className="bg-slate-100 text-[11px] text-slate-500 uppercase">
                                <tr>
                                  <th className="px-4 py-2">Item</th>
                                  <th className="px-4 py-2 text-center bg-blue-50/50">Qtd Pedido</th>
                                  <th className="px-4 py-2 text-center bg-amber-50/50">Qtd NFe</th>
                                  <th className="px-4 py-2 text-right bg-blue-50/50">Preço Pedido</th>
                                  <th className="px-4 py-2 text-right bg-amber-50/50">Preço NFe</th>
                                  <th className="px-4 py-2 text-center">Status</th>
                                </tr>
                              </thead>
                              <tbody className="text-sm divide-y divide-slate-100">
                                {nota.itens.map((item, idx) => (
                                  <tr key={idx} className={item.status !== 'VALIDADO' ? 'bg-red-50/30' : ''}>
                                    <td className="px-4 py-2 font-medium text-slate-700">{item.nome}</td>
                                    <td className="px-4 py-2 text-center font-mono">{item.pedidoQtd}</td>
                                    <td className={`px-4 py-2 text-center font-mono font-bold ${item.notaQtd !== item.pedidoQtd ? 'text-red-600' : 'text-emerald-600'}`}>
                                      {item.notaQtd}
                                    </td>
                                    <td className="px-4 py-2 text-right font-mono">{formatCurrency(item.pedidoPreco, 'BRL')}</td>
                                    <td className={`px-4 py-2 text-right font-mono font-bold ${item.notaPreco !== item.pedidoPreco ? 'text-red-600' : 'text-emerald-600'}`}>
                                      {formatCurrency(item.notaPreco, 'BRL')}
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                      {item.status === 'VALIDADO' ? (
                                        <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold">OK</span>
                                      ) : (
                                        <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold uppercase">{item.status.replace('_', ' ')}</span>
                                      )}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            {nota.status === 'DIVERGENTE' && (
                              <div className="mt-4 flex gap-2 justify-end">
                                <Button variant="secondary" size="sm" className="text-slate-600 bg-white border border-slate-300">Notificar Fornecedor</Button>
                                <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">Forçar Aprovação (Exceção)</Button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>

        </main>
      </div>
    </div>
  );
}
