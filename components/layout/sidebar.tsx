'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ClipboardList, MessageSquare, ShoppingBag, 
  CheckCircle, FileSignature, Receipt, Users, BarChart2, 
  Link as LinkIcon, UserCog, ExternalLink, LogOut 
} from 'lucide-react';
import { useAuthStore } from '@/lib/store';
import { cn } from '@/lib/utils';

const navGroups = [
  {
    label: 'PRINCIPAL',
    items: [
      { href: '/dashboard',   label: 'Dashboard',         icon: LayoutDashboard, badge: null },
      { href: '/requisicoes', label: 'Requisições',       icon: ClipboardList,   badge: { text: '5', color: 'bg-blue-600 text-white' } },
      { href: '/rfqs',        label: 'RFQ / Cotações',    icon: MessageSquare,   badge: { text: '4', color: 'bg-yellow-500 text-yellow-950' } },
      { href: '/orders',      label: 'Pedidos de Compra', icon: ShoppingBag,     badge: null },
      { href: '/aprovacoes',  label: 'Aprovações',        icon: CheckCircle,     badge: { text: '5', color: 'bg-yellow-500 text-yellow-950' } },
      { href: '/contratos',   label: 'Contratos',         icon: FileSignature,   badge: null },
      { href: '/notas',       label: 'Notas Fiscais',     icon: Receipt,         badge: { text: '2', color: 'bg-red-500 text-white' } },
    ],
  },
  {
    label: 'GESTÃO',
    items: [
      { href: '/suppliers',   label: 'Fornecedores',      icon: Users,           badge: null },
      { href: '/analytics',   label: 'Analytics',         icon: BarChart2,       badge: null },
    ],
  },
  {
    label: 'SISTEMA',
    items: [
      { href: '/integracoes', label: 'Integrações',       icon: LinkIcon,        badge: null },
      { href: '/usuarios',    label: 'Usuários & Acessos',icon: UserCog,         badge: null },
      { href: '/fornecedor',  label: 'Portal Fornecedor', icon: ExternalLink,    badge: null, external: true },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-64 h-screen bg-[#0a192f] flex flex-col fixed left-0 top-0 z-40 border-r border-white/5">
      {/* Logo */}
      <div className="px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-sm flex-shrink-0 shadow-lg shadow-blue-900/50">B</div>
          <span className="text-white font-bold text-lg tracking-tight">BidFlow</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto scrollbar-hide space-y-6">
        {navGroups.map(group => (
          <div key={group.label}>
            <p className="text-white/40 text-[11px] font-bold uppercase tracking-wider px-3 mb-2">{group.label}</p>
            <div className="space-y-1">
              {group.items.map(({ href, label, icon: Icon, badge, external }) => {
                const active = pathname === href || (href !== '/dashboard' && pathname.startsWith(href));
                return (
                  <Link key={href} href={href} target={external ? '_blank' : '_self'}
                    className={cn(
                      'flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                      active 
                        ? 'bg-blue-600/15 text-blue-400' 
                        : 'text-slate-300 hover:bg-white/5 hover:text-white',
                    )}>
                    <div className="flex items-center gap-3">
                      <Icon size={18} strokeWidth={2} className={cn("transition-colors", active ? "text-blue-400" : "text-slate-400 group-hover:text-slate-300")}/>
                      {label}
                    </div>
                    {badge && (
                      <span className={cn('text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center justify-center min-w-[20px]', badge.color)}>
                        {badge.text}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-4 mt-auto">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
            {user?.firstName?.[0] || 'A'}{user?.lastName?.[0] || 'D'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{user?.firstName || 'Admin'} {user?.lastName || 'User'}</p>
            <p className="text-white/40 text-xs truncate">Administrador</p>
          </div>
          <button onClick={logout} className="text-white/40 hover:text-red-400 transition-colors p-1" title="Sair">
            <LogOut size={16}/>
          </button>
        </div>
      </div>
    </aside>
  );
}
