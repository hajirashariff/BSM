import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home, 
  Ticket, 
  Building2, 
  Server, 
  Workflow, 
  BarChart3, 
  Users, 
  BookOpen, 
  Plug, 
  Settings,
  Search,
  User as UserIcon,
  Brain
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/tickets', label: 'Tickets', icon: Ticket },
  { href: '/accounts', label: 'Account Management', icon: Building2 },
  { href: '/assets', label: 'Asset Management', icon: Server },
  { href: '/rules-engine', label: 'Rules Engine', icon: Brain },
  { href: '/workflows', label: 'Workflow Engine', icon: Workflow },
  { href: '/analytics', label: 'Analytics & Reports', icon: BarChart3 },
  { href: '/users', label: 'User Management', icon: Users },
  { href: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
  { href: '/integrations', label: 'Integrations', icon: Plug },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <img src="/ackermann-logo.svg" alt="Ackermann" className="w-8 h-8 rounded-lg" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Ackermann</h1>
          </div>
        </div>
        
        <nav className="px-4 pb-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const active = router.pathname === item.href;
              const Icon = item.icon;
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href} 
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                      active 
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600 dark:bg-zinc-800 dark:text-zinc-100 dark:border-primary-400' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                {navItems.find(item => item.href === router.pathname)?.label || 'Home'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search tickets, accounts, assets..." 
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <Link href="/settings" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center dark:bg-zinc-700">
                  {user?.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={user.avatarUrl} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon size={16} className="text-gray-600" />
                  )}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-zinc-300 group-hover:underline">
                  {user?.displayName || 'Admin User'}
                </span>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}



