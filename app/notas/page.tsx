'use client';
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { formatCurrency, formatDate } from '@/lib/utils';
import { FileText, ChevronDown, ChevronUp, AlertTriangle, CheckCircle } from 'lucide-react';

const mockNotas = [
  { 
    id: 'NF-89450', poNumber: 'PED-2026-042', fornecedor: 'TechCorp Brasil', emissao: '2026-03-18T10:00:00Z', valorTotal: 160000, 
    status: 'DIVERGENTE', motivo: 'Quantidade faturada maior que o pedido',
    itens: [
      { nome: 'Notebook Dell Latitude 7420', pedidoQtd: 20, notaQtd: 22, pedidoPreco: 7500, notaPreco: 7500, status: 'DIVERGENTE_QTD' },
      { nome: 'Monitor Dell 27"', pedidoQtd: 20, notaQtd: 20, pedidoPreco: 500, notaPreco: 500, status: 'VALIDADO' }
    ]
  }
];

export default function NotasFiscaisPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Validação de Notas Fiscais" subtitle="Cruzamento automático (PDF vs Pedido)" />
        <main className="flex-1 p-6 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-500 uppercase font-bold">
                  <th className="px-5 py-3">Nota Fiscal</th>
                  <th className="px-5 py-3">Pedido</th>
                  <th className="px-5 py-3">Valor NF</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockNotas.map((nota) => (
                  <React.Fragment key={nota.id}>
                    <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => setExpandedId(expandedId === nota.id ? null : nota.id)}>
                      <td className="px-5 py-4 font-bold text-slate-900">{nota.id}</td>
                      <td className="px-5 py-4 text-blue-600 font-medium">{nota.poNumber}</td>
                      <td className="px-5 py-4 font-bold">{formatCurrency(nota.valorTotal, 'BRL')}</td>
                      <td className="px-5 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold border ${nota.status === 'DIVERGENTE' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                          {nota.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right text-slate-400">
                        {expandedId === nota.id ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}
                      </td>
                    </tr>
                    {expandedId === nota.id && (
                      <tr className="bg-slate-50/50">
                        <td colSpan={5} className="px-8 py-4">
                          <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-inner">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase mb-3 flex items-center gap-2">
                              <AlertTriangle size={14} className="text-red-500"/> Detalhes da Divergência (Itens)
                            </h4>
                            {nota.itens.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0 text-sm">
                                <span className="text-slate-700">{item.nome}</span>
                                <div className="flex gap-8">
                                  <span className="text-slate-500">Ped: {item.pedidoQtd}</span>
                                  <span className={`font-bold ${item.notaQtd !== item.pedidoQtd ? 'text-red-600' : 'text-emerald-600'}`}>NF: {item.notaQtd}</span>
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
