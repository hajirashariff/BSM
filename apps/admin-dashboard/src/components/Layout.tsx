import React, { useState } from 'react';
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
  MessageSquare,
  Search,
  User,
  ArrowDown,
  ExternalLink,
  CheckCircle,
  Brain
} from 'lucide-react';
import NotificationDropdown from './NotificationDropdown';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Home },
  { href: '/tickets', label: 'Service Requests', icon: Ticket },
  { href: '/accounts', label: 'Account Management', icon: Building2 },
  { href: '/assets', label: 'Asset Management', icon: Server },
  { href: '/workflows', label: 'Workflow Engine', icon: Workflow },
  { href: '/rules-engine', label: 'Rules Engine', icon: Brain },
  { href: '/analytics', label: 'Analytics & Reports', icon: BarChart3 },
  { href: '/users', label: 'User Management', icon: Users },
  // Removed per request: Customer Messages and Notifications in sidebar
  { href: '/knowledge', label: 'Knowledge Base', icon: BookOpen },
  { href: '/integrations', label: 'Integrations', icon: Plug },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [showPortalMenu, setShowPortalMenu] = useState(false);
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const switchToCustomerPortal = () => {
    console.log('Switching to Customer Portal...');
    window.location.href = 'http://localhost:3000';
    setShowPortalMenu(false);
  };

  const switchToAdminPortal = () => {
    console.log('Switching to Admin Portal...');
    window.location.href = 'http://localhost:3001';
    setShowPortalMenu(false);
  };

  const handleGlobalSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    try {
      // Simulate API call for global search
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock search results based on current page
      const mockResults = [
        {
          id: 'TKT-001',
          title: 'VPN connectivity issues',
          type: 'ticket',
          status: 'open',
          priority: 'high',
          url: '/tickets'
        },
        {
          id: 'CL-001',
          title: 'TechCorp Inc.',
          type: 'client',
          status: 'active',
          tier: 'gold',
          url: '/client-accounts'
        },
        {
          id: 'AST-001',
          title: 'Dell OptiPlex 7090',
          type: 'asset',
          status: 'active',
          location: 'Office A',
          url: '/it-assets'
        },
        {
          id: 'MSG-001',
          title: 'Service request from John Doe',
          type: 'message',
          status: 'unread',
          priority: 'medium',
          url: '/customer-messages'
        }
      ].filter(result => 
        result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        result.id.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setSearchResults(mockResults);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGlobalSearchTerm(value);
    handleGlobalSearch(value);
  };

  const handleSearchResultClick = (result: any) => {
    router.push(result.url);
    setShowSearchResults(false);
    setGlobalSearchTerm('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (globalSearchTerm.trim()) {
      // Navigate to search results page or perform search
      router.push(`/search?q=${encodeURIComponent(globalSearchTerm)}`);
      setShowSearchResults(false);
    }
  };
  
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
              <h2 className="text-4xl font-bold text-gray-900">
                {navItems.find(item => item.href === router.pathname)?.label || ''}
              </h2>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <form onSubmit={handleSearchSubmit}>
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search tickets, accounts, assets..." 
                    value={globalSearchTerm}
                    onChange={handleSearchInputChange}
                    onFocus={() => globalSearchTerm && setShowSearchResults(true)}
                    onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </form>
                
                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                    <div className="p-2">
                      <div className="text-xs text-gray-500 px-3 py-2 border-b border-gray-100">
                        Search Results ({searchResults.length})
                      </div>
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearchResultClick(result)}
                          className="w-full text-left px-3 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              result.type === 'ticket' ? 'bg-blue-100' :
                              result.type === 'client' ? 'bg-green-100' :
                              result.type === 'asset' ? 'bg-purple-100' :
                              'bg-orange-100'
                            }`}>
                              {result.type === 'ticket' ? <Ticket size={16} className="text-blue-600" /> :
                               result.type === 'client' ? <Building2 size={16} className="text-green-600" /> :
                               result.type === 'asset' ? <Server size={16} className="text-purple-600" /> :
                               <MessageSquare size={16} className="text-orange-600" />}
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{result.title}</div>
                              <div className="text-sm text-gray-500">
                                {result.id} • {result.type} • {result.status}
                                {result.priority && ` • ${result.priority} priority`}
                                {result.tier && ` • ${result.tier} tier`}
                                {result.location && ` • ${result.location}`}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* No Results */}
                {showSearchResults && searchResults.length === 0 && globalSearchTerm && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4 text-center text-gray-500">
                      <Search size={24} className="mx-auto mb-2 text-gray-400" />
                      <p>No results found for "{globalSearchTerm}"</p>
                      <p className="text-sm">Try different keywords</p>
                    </div>
                  </div>
                )}
              </div>
              
              <NotificationDropdown />
              
              {/* Portal Switch Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowPortalMenu(!showPortalMenu)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <User size={16} />
                  <span className="text-sm font-medium">Admin</span>
                  <ArrowDown size={14} className={`transition-transform duration-200 ${showPortalMenu ? 'rotate-180' : ''}`} />
                </button>

                {showPortalMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">Switch Portal</p>
                    </div>
                    <button
                      onClick={switchToAdminPortal}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-blue-50 transition-colors"
                    >
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                        <Settings className="text-white" size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Admin Portal</p>
                        <p className="text-xs text-gray-600">Management dashboard</p>
                      </div>
                      <CheckCircle className="text-blue-500 ml-auto" size={16} />
                    </button>
                    <button
                      onClick={switchToCustomerPortal}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-green-50 transition-colors"
                    >
                      <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                        <Users className="text-white" size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Customer Portal</p>
                        <p className="text-xs text-gray-600">Client interface</p>
                      </div>
                      <ExternalLink className="text-gray-400 ml-auto" size={16} />
                    </button>
                  </div>
                )}
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