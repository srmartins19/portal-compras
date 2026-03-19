'use client';
import React, { useState } from 'react'; // Importação corrigida
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Search, Filter, Receipt, AlertTriangle, CheckCircle, FileText, ChevronDown, ChevronUp, Clock } from 'lucide-react';

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
  }
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    VALIDADA: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    DIVERGENTE: 'bg-red-50 text-red-700 border-red-200',
    PROCESSANDO: 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse',
  };
  return (
    <span className={`flex items-center w-max px-2.5 py-1 rounded-full text-[11px] font-bold border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function NotasFiscaisPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Validação de Notas Fiscais" subtitle="Cruzamento automático com Pedidos de Compra" />
        <main className="flex-1 p-6 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase">
                  <th className="px-5 py-3">Nota Fiscal</th>
                  <th className="px-5 py-3">Pedido</th>
                  <th className="px-5 py-3">Fornecedor</th>
                  <th className="px-5 py-3">Valor NF</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockNotas.map((nota) => (
                  <React.Fragment key={nota.id}>
                    <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => setExpandedId(expandedId === nota.id ? null : nota.id)}>
                      <td className="px-5 py-4 font-semibold">{nota.id}</td>
                      <td className="px-5 py-4 text-blue-600">{nota.poNumber}</td>
                      <td className="px-5 py-4">{nota.fornecedor}</td>
                      <td className="px-5 py-4 font-bold">{formatCurrency(nota.valorTotal, 'BRL')}</td>
                      <td className="px-5 py-4">{getStatusBadge(nota.status)}</td>
                      <td className="px-5 py-4">{expandedId === nota.id ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}</td>
                    </tr>
                    {expandedId === nota.id && (
                      <tr>
                        <td colSpan={6} className="bg-slate-50 p-6">
                           <div className="border border-slate-200 rounded-lg bg-white p-4">
                             <h4 className="text-xs font-bold text-slate-500 mb-3 uppercase">Conferência de Itens</h4>
                             {nota.itens.map((item, i) => (
                               <div key={i} className="flex justify-between text-sm py-2 border-b border-slate-50 last:border-0">
                                 <span>{item.nome}</span>
                                 <div className="space-x-4">
                                   <span>Pedido: {item.pedidoQtd}</span>
                                   <span className={item.notaQtd !== item.pedidoQtd ? 'text-red-600 font-bold' : ''}>Nota: {item.notaQtd}</span>
                                 </div>
                               </div>
                             ))}
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
