import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { 
  Home as HomeIcon, 
  Ticket, 
  HelpCircle,
  CreditCard,
  User,
  FileText,
  MessageSquare,
  Download,
  Settings as SettingsIcon,
  Bell,
  Search,
  Plus,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Activity,
  Phone,
  Mail,
  Calendar
} from 'lucide-react';
import AITicketCreator from '../components/AITicketCreator';
import AIAccountInsights from '../components/AIAccountInsights';
import AIChatbot from '../components/AIChatbot';
import ThemeToggle from '../components/theme-toggle';

const navItems = [
  { href: '/', label: 'Dashboard', icon: HomeIcon },
  { href: '/tickets', label: 'Support Tickets', icon: Ticket },
  { href: '/help', label: 'Help Center', icon: HelpCircle },
  { href: '/billing', label: 'Billing & Invoices', icon: CreditCard },
  { href: '/account', label: 'My Account', icon: User },
  { href: '/documents', label: 'Documents', icon: FileText },
  { href: '/chat', label: 'Live Chat', icon: MessageSquare },
  { href: '/downloads', label: 'Downloads', icon: Download },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

const kpiCards = [
  {
    title: 'Active Tickets',
    value: '3',
    change: '+1',
    changeType: 'increase',
    icon: Ticket,
    color: 'text-blue-600'
  },
  {
    title: 'Resolved This Month',
    value: '8',
    change: '+2',
    changeType: 'increase',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    title: 'Response Time',
    value: '2.1h',
    change: '-15%',
    changeType: 'decrease',
    icon: Clock,
    color: 'text-orange-600'
  },
  {
    title: 'Satisfaction',
    value: '4.8/5',
    change: '+0.3',
    changeType: 'increase',
    icon: TrendingUp,
    color: 'text-purple-600'
  }
];

const recentTickets = [
  { id: 'TCK-2024-001', subject: 'Email server configuration issue', priority: 'High', status: 'In Progress', assignee: 'Sarah Johnson', created: '2 hours ago' },
  { id: 'TCK-2024-002', subject: 'Password reset not working', priority: 'Medium', status: 'Open', assignee: 'Mike Chen', created: '4 hours ago' },
  { id: 'TCK-2024-003', subject: 'Database performance optimization', priority: 'Low', status: 'Resolved', assignee: 'Alex Rodriguez', created: '6 hours ago' },
  { id: 'TCK-2024-004', subject: 'Software license renewal', priority: 'High', status: 'Open', assignee: 'Sarah Wilson', created: '8 hours ago' },
];

const serviceHealth = [
  { name: 'Email Services', health: 99, status: 'Operational', lastCheck: '2 min ago' },
  { name: 'File Storage', health: 95, status: 'Operational', lastCheck: '1 min ago' },
  { name: 'Support Portal', health: 98, status: 'Operational', lastCheck: '30 sec ago' },
  { name: 'Billing System', health: 97, status: 'Operational', lastCheck: '1 min ago' },
];

export default function Dashboard() {
  const router = useRouter();
  const [showAITicketCreator, setShowAITicketCreator] = useState(false);
  const [showAIChatbot, setShowAIChatbot] = useState(false);
  const [isChatbotMinimized, setIsChatbotMinimized] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getProgressBarClass = (health: number) => {
    if (health >= 95) return 'progress-bar-95';
    if (health >= 90) return 'progress-bar-90';
    if (health >= 85) return 'progress-bar-85';
    return 'progress-bar-85';
  };

  const handleCreateAITicket = (ticketData: any) => {
    console.log('AI Ticket Created:', ticketData);
    setShowAITicketCreator(false);
    alert('AI-powered ticket created successfully!');
  };

  const handleAIChatbotToggle = () => {
    setShowAIChatbot(!showAIChatbot);
  };

  const handleChatbotMinimize = () => {
    setIsChatbotMinimized(!isChatbotMinimized);
  };

  if (!isClient) {
        return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
            </div>
          </div>
        );
  }

  return (
    <>
      <Head>
        <title>BSM Portal - Customer Portal</title>
        <meta name="description" content="Customer portal for ticket management and support" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 z-50 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BSM</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-zinc-100">Customer Portal</h1>
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
                  Dashboard
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search tickets, services, knowledge..." 
                    className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={() => setShowAITicketCreator(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Create Ticket</span>
                </button>
                
                <button
                  onClick={handleAIChatbotToggle}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800"
                >
                  <span className="text-lg">🤖</span>
                </button>
                
                <ThemeToggle />
                
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg dark:text-zinc-300 dark:hover:text-zinc-100 dark:hover:bg-zinc-800">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center dark:bg-zinc-700">
                    <User size={16} />
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-zinc-300">Customer User</span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="p-6">
            <div className="space-y-6">
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {kpiCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <div key={index} className="card">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{card.title}</p>
                          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                          <p className={`text-sm ${card.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                            {card.change} from last month
                          </p>
                        </div>
                        <div className={`p-3 rounded-lg bg-gray-50 ${card.color}`}>
                          <Icon size={24} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Charts and Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Tickets */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Tickets</h3>
                    <button className="btn-secondary text-sm">View All</button>
                  </div>
                  <div className="space-y-3">
                    {recentTickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">{ticket.id}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              ticket.priority === 'High' ? 'bg-red-100 text-red-800' :
                              ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {ticket.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{ticket.subject}</p>
                          <p className="text-xs text-gray-500 mt-1">Assigned to {ticket.assignee} • {ticket.created}</p>
                        </div>
                        <div className={`px-2 py-1 text-xs rounded-full ${
                          ticket.status === 'Open' ? 'bg-blue-100 text-blue-800' :
                          ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {ticket.status}
                        </div>
                      </div>
                    ))}
          </div>
        </div>

                {/* Service Health */}
                <div className="card">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Service Health</h3>
                    <button className="btn-secondary text-sm">View All</button>
                  </div>
                  <div className="space-y-4">
                    {serviceHealth.map((service, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium text-gray-900">{service.name}</span>
                            <span className="text-sm text-gray-600">{service.health}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`progress-bar ${getProgressBarClass(service.health)} ${
                                service.health >= 95 ? 'bg-green-500' :
                                service.health >= 90 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                            <span className={`${
                              service.status === 'Operational' ? 'text-green-600' :
                              service.status === 'Minor Issues' ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {service.status}
                            </span>
                            <span>Last check: {service.lastCheck}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
            
              {/* Quick Actions */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => setShowAITicketCreator(true)}
                    className="btn-primary flex items-center justify-center space-x-2"
                  >
                    <Ticket size={20} />
                    <span>Create Support Ticket</span>
                  </button>
                  <button className="btn-secondary flex items-center justify-center space-x-2">
                    <HelpCircle size={20} />
                    <span>Get Help</span>
                  </button>
                  <button className="btn-secondary flex items-center justify-center space-x-2">
                    <MessageSquare size={20} />
                    <span>Live Chat</span>
                  </button>
                </div>
              </div>

              {/* System Status */}
              <div className="card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Support Portal</p>
                      <p className="text-sm text-gray-600">All systems operational</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Billing System</p>
                      <p className="text-sm text-gray-600">Running normally</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <Activity className="text-green-600" size={20} />
                    <div>
                      <p className="font-medium text-gray-900">Live Chat</p>
                      <p className="text-sm text-gray-600">Available 24/7</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
                 </main>
               </div>
             </div>

             {/* AI Components */}
             {showAITicketCreator && (
               <AITicketCreator
                 onSubmit={handleCreateAITicket}
                 onCancel={() => setShowAITicketCreator(false)}
               />
             )}

             <AIChatbot
               isOpen={showAIChatbot}
               onClose={() => setShowAIChatbot(false)}
               onMinimize={handleChatbotMinimize}
               isMinimized={isChatbotMinimized}
             />
           </>
         );
       }