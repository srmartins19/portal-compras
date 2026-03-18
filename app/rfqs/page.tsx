'use client';
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rfqsApi } from '@/lib/api';
import { Topbar } from '@/components/layout/topbar';
import { formatDate, getRfqStatusColor } from '@/lib/utils';
import { Plus, Search, ChevronRight, FileText } from 'lucide-react';

const STATUSES = ['', 'DRAFT', 'OPEN', 'ANALYSIS', 'CLOSED'];

export default function RfqsPage() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ['rfqs', { search, status, page }],
    queryFn: () => rfqsApi.list({ search: search || undefined, status: status || undefined, page, limit: 15 }).then(r => r.data),
  });

  return (
    <>
      <Topbar
        title="RFQs"
        subtitle={`${data?.total || 0} total`}
        action={
          <a href="/rfqs/new" className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#163050] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
            <Plus size={16} /> New RFQ
          </a>
        }
      />

      <main className="flex-1 p-6">
        {/* Filters */}
        <div className="flex gap-3 mb-5">
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search RFQs..." 
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/30 bg-white"
            />
          </div>
          <select
            value={status} onChange={e => setStatus(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          >
            {STATUSES.map(s => <option key={s} value={s}>{s || 'All statuses'}</option>)}
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {['Number', 'Title', 'Status', 'Suppliers', 'Bids', 'Deadline', 'Created by', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && (
                <tr><td colSpan={8} className="text-center py-12 text-slate-400 text-sm">Loading...</td></tr>
              )}
              {!isLoading && data?.data?.length === 0 && (
                <tr><td colSpan={8} className="text-center py-16">
                  <FileText size={32} className="mx-auto text-slate-300 mb-3" />
                  <p className="text-sm text-slate-500">No RFQs found</p>
                  <a href="/rfqs/new" className="text-blue-600 text-sm font-medium mt-1 inline-block hover:underline">Create your first RFQ</a>
                </td></tr>
              )}
              {data?.data?.map((rfq: any) => (
                <tr key={rfq.id} className="hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => window.location.href = `/rfqs/${rfq.id}`}>
                  <td className="px-4 py-3.5">
                    <span className="font-mono text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">{rfq.number}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="text-sm font-medium text-slate-900">{rfq.title}</p>
                    {rfq.auctionEnabled && <span className="text-xs text-purple-600 font-medium">⚡ Auction</span>}
                  </td>
                  <td className="px-4 py-3.5">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getRfqStatusColor(rfq.status)}`}>{rfq.status}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{rfq.suppliers?.length || 0}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{rfq.bids?.length || 0}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">{formatDate(rfq.deadline)}</td>
                  <td className="px-4 py-3.5 text-sm text-slate-600">
                    {rfq.createdBy?.firstName} {rfq.createdBy?.lastName?.[0]}.
                  </td>
                  <td className="px-4 py-3.5"><ChevronRight size={16} className="text-slate-400" /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100">
              <p className="text-xs text-slate-500">Showing {((page-1)*15)+1}–{Math.min(page*15, data.total)} of {data.total}</p>
              <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(p => p-1)} className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50">← Prev</button>
                <button disabled={page >= data.totalPages} onClick={() => setPage(p => p+1)} className="px-3 py-1.5 text-xs border border-slate-200 rounded-lg disabled:opacity-40 hover:bg-slate-50">Next →</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
