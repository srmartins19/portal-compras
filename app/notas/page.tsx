'use client';
import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { formatCurrency } from '@/lib/utils';

export default function NotasPage() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const mockNotas = [{ id: 'NF-89450', po: 'PED-042', valor: 160000, status: 'DIVERGENTE' }];
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar /><div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Notas Fiscais" />
        <main className="p-6">
          <table className="w-full bg-white rounded-xl border border-slate-200">
            <tbody>{mockNotas.map(n => (
              <React.Fragment key={n.id}>
                <tr className="border-b p-4 cursor-pointer" onClick={() => setExpandedId(expandedId === n.id ? null : n.id)}>
                  <td className="p-4 font-bold">{n.id}</td>
                  <td className="p-4">{formatCurrency(n.valor, 'BRL')}</td>
                  <td className="p-4 text-red-600 font-bold">{n.status}</td>
                </tr>
              </React.Fragment>
            ))}</tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
