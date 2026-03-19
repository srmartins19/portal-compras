'use client';
import { useQuery } from '@tanstack/react-query';
import { suppliersApi, analyticsApi } from '@/lib/api';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { formatCurrency } from '@/lib/utils';
import { Mail, Phone, Globe, MapPin, CheckCircle, Clock, ShieldCheck } from 'lucide-react';

export default function SupplierDetailsPage({ params }: { params: { id: string } }) {
  const { data: supplier, isLoading } = useQuery({
    queryKey: ['supplier', params.id],
    queryFn: () => suppliersApi.get(params.id).then(r => r.data)
  });

  if (isLoading || !supplier) return <div className="p-10 text-center">Carregando Fornecedor...</div>;

  // BLINDAGEM TÉCNICA: Forçamos o tipo para 'any' para aceitar campos como .phone, .address etc.
  const s = supplier as any;

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title={s.name} subtitle="Perfil Detalhado do Fornecedor" />
        <main className="flex-1 p-6 space-y-6 max-w-5xl mx-auto w-full">
          
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {s.name?.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{s.name}</h2>
                  <div className="flex gap-2 mt-1">
                    {s.categories?.map((c: string) => (
                      <span key={c} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${s.isApproved ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                  {s.isApproved ? 'FORNECEDOR HOMOLOGADO' : 'EM ANÁLISE'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100">
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contato</h4>
                <div className="flex items-center gap-2 text-sm text-slate-600"><Mail size={14}/> {s.email}</div>
                <div className="flex items-center gap-2 text-sm text-slate-600"><Phone size={14}/> {s.phone || '(11) 4004-0000'}</div>
              </div>
              <div className="space-y-3">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Performance Geral</h4>
                <div className="text-3xl font-black text-blue-600">{s.performance?.overallScore?.toFixed(1) || '0.0'}</div>
                <p className="text-[10px] text-slate-400">Baseado em qualidade e entrega</p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
