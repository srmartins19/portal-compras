'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, FileText, ShoppingBag, 
  Users, BarChart2, Settings, LogOut, Package, Receipt 
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const menuGroups = [
    {
      label: 'Principal',
      items: [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/rfqs', label: 'Cotações (RFQs)', icon: FileText },
        { href: '/orders', label: 'Pedidos de Compra', icon: ShoppingBag },
      ]
    },
    {
      label: 'Gestão',
      items: [
        { href: '/items', label: 'Catálogo de Itens', icon: Package },
        { href: '/suppliers', label: 'Fornecedores', icon: Users },
        { href: '/notas', label: 'Notas Fiscais', icon: Receipt },
      ]
    },
    {
      label: 'Análise',
      items: [
        { href: '/analytics', label: 'Relatórios', icon: BarChart2 },
      ]
    }
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1e3a5f] text-white flex flex-col z-50">
      <div className="p-6 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-xs">CB</div>
          BidFlow <span className="text-[10px] bg-blue-400/20 px-1.5 py-0.5 rounded text-blue-300">PRO</span>
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-8">
        {menuGroups.map((group) => (
          <div key={group.label}>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-wider px-3 mb-3">{group.label}</p>
            <div className="space-y-1">
              {group.items.map((item: any) => { // 'any' aqui blinda contra o erro de 'external'
                const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10 space-y-1">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-white/60 hover:bg-white/5 rounded-lg">
          <Settings size={18} /> Configurações
        </Link>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
          <LogOut size={18} /> Sair
        </button>
      </div>
    </aside>
  );
}
