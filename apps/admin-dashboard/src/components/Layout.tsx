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
  Bell,
  Search,
  User
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/tickets', label: 'Service Requests', icon: Ticket },
  { href: '/accounts', label: 'Account Management', icon: Building2 },
  { href: '/assets', label: 'Asset Management', icon: Server },
  { href: '/workflows', label: 'Workflow Engine', icon: Workflow },
  { href: '/analytics', label: 'Analytics & Reports', icon: BarChart3 },
  { href: '/users', label: 'User Management', icon: Users },
  { href: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
  { href: '/integrations', label: 'Integrations', icon: Plug },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BSM</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Pro BSM</h1>
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
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
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
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                {navItems.find(item => item.href === router.pathname)?.label || 'Dashboard'}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Portal Switcher */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => window.open('http://localhost:3000', '_blank')}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-white rounded-md transition-colors duration-200"
                >
                  <span>🌐</span>
                  <span>Web Portal</span>
                </button>
                <button
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm font-medium text-white bg-primary-600 rounded-md"
                >
                  <span>⚙️</span>
                  <span>Admin Portal</span>
                </button>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Search tickets, accounts, assets..." 
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <span className="text-sm font-medium text-gray-700">Admin User</span>
              </div>
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



