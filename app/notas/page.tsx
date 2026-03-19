'use client';
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { formatCurrency } from '@/lib/utils';
import { ChevronDown, ChevronUp, FileText, AlertTriangle } from 'lucide-react';

export default function NotasPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const mockNotas = [
    { id: 'NF-89450', po: 'PED-2026-042', valor: 160000, status: 'DIVERGENTE' }
  ];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col text-slate-900">
        <Topbar title="Validação de Notas" subtitle="Conferência PDF vs Pedido" />
        <main className="flex-1 p-6">
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-500 uppercase">
                <tr>
                  <th className="px-5 py-3">Nota Fiscal</th>
                  <th className="px-5 py-3">Pedido</th>
                  <th className="px-5 py-3">Valor</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {mockNotas.map(n => (
                  <React.Fragment key={n.id}>
                    <tr className="hover:bg-slate-50 cursor-pointer" onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}>
                      <td className="px-5 py-4 font-bold">{n.id}</td>
                      <td className="px-5 py-4 text-blue-600">{n.po}</td>
                      <td className="px-5 py-4 font-bold">{formatCurrency(n.valor, 'BRL')}</td>
                      <td className="px-5 py-4">
                        <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-[10px] font-bold">{n.status}</span>
                      </td>
                      <td className="px-5 py-4">{expandedId === n.id ? <ChevronUp /> : <ChevronDown />}</td>
                    </tr>
                    {expandedId === n.id && (
                      <tr className="bg-slate-50">
                        <td colSpan={5} className="p-4 px-10">
                          <div className="flex items-center gap-2 text-red-600 text-xs font-bold">
                            <AlertTriangle size={14}/> Divergência encontrada: Quantidade na nota superior ao pedido.
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
