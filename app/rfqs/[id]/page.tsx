'use client';
import { useQuery } from '@tanstack/react-query';
import { rfqsApi } from '@/lib/api';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';

export default function RfqDetailsPage({ params }: { params: { id: string } }) {
  const { data: rfq } = useQuery({ queryKey: ['rfq', params.id], queryFn: () => rfqsApi.get(params.id).then(r => r.data) });
  if (!rfq) return null;
  const r = rfq as any;
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar /><div className="flex-1 ml-64 flex flex-col">
        <Topbar title={`Cotação ${r.number || ''}`} />
        <main className="p-6"><div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold">{r.title}</h2>
          <p className="mt-2 text-slate-600">Status: {r.status}</p>
        </div></main>
      </div>
    </div>
  );
}
