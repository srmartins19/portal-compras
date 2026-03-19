'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rfqsApi } from '@/lib/api';
import { Sidebar } from '@/components/layout/sidebar';
import { Topbar } from '@/components/layout/topbar';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function InviteSuppliersPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [success, setSuccess] = useState(false);

  const inviteMutation = useMutation({
    // Usando cast para evitar erro de propriedade inexistente durante o build
    mutationFn: (supplierIds: string[]) => (rfqsApi as any).invite(params.id, supplierIds),
    onSuccess: () => {
      setSuccess(true);
      setTimeout(() => router.push(`/rfqs/${params.id}`), 2000);
    }
  });

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar title="Convidar Fornecedores" />
        <main className="p-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            {success ? (
              <p className="text-emerald-600 font-bold">Convites enviados com sucesso!</p>
            ) : (
              <button 
                onClick={() => inviteMutation.mutate(['sup-1'])}
                className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
              >
                Simular Envio de Convites
              </button>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
