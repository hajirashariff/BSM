import React, { useState } from 'react';
import { 
  Ticket, 
  Search, 
  Bell, 
  User, 
  Settings, 
  ArrowDown,
  Plus,
  Clock,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  BarChart3,
  Users
} from 'lucide-react';

export default function HomePage() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const switchToAdminPortal = () => {
    console.log('Switching to Admin Portal...');
    window.location.href = 'http://localhost:3001';
    setShowUserMenu(false);
  };

  const recentTickets = [
    { id: 'TCK-2024-001', subject: 'VPN connectivity issues', priority: 'High', status: 'Open', created: '2 hours ago' },
    { id: 'TCK-2024-002', subject: 'Email server maintenance', priority: 'Medium', status: 'In Progress', created: '4 hours ago' },
    { id: 'TCK-2024-003', subject: 'New user onboarding', priority: 'Low', status: 'Resolved', created: '6 hours ago' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <BarChart3 className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">BSM Customer Portal</h1>
                <p className="text-sm text-gray-600">Service requests and support</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search tickets, knowledge base..." 
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </button>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  <User size={16} />
                  <span className="text-sm font-medium">Customer</span>
                  <ArrowDown size={14} className={`transition-transform duration-200 ${showUserMenu ? 'rotate-180' : ''}`} />
                </button>

                {showUserMenu && (
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
                      <ExternalLink className="text-gray-400 ml-auto" size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to BSM Customer Portal</h2>
              <p className="text-gray-600">Manage your service requests, access knowledge base, and track system status.</p>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5">
              <Plus size={16} />
              <span className="font-medium">New Ticket</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
                <Ticket className="text-blue-600" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100">
                <CheckCircle className="text-green-600" size={20} />
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Response</p>
                <p className="text-2xl font-bold text-gray-900">2.4h</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100">
                <Clock className="text-orange-600" size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg">
                <Ticket className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Recent Tickets</h3>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          
          <div className="space-y-3">
            {recentTickets.map((ticket, index) => (
              <div key={ticket.id} className="group p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-blue-50 hover:to-blue-100 transition-all duration-300 border border-gray-200/50 hover:border-blue-200/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{ticket.id}</span>
                      <span className={`px-2 py-1 text-xs rounded-full font-medium border ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{ticket.subject}</p>
                    <p className="text-xs text-gray-500">{ticket.created}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                <CheckCircle className="text-white" size={20} />
              </div>
              <h3 className="text-lg font-bold text-gray-900">System Status</h3>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 font-medium">All Systems Operational</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">API Services</p>
                <p className="text-sm text-gray-600">Operational</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg">
              <AlertTriangle className="text-yellow-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Database</p>
                <p className="text-sm text-gray-600">Minor issues</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <Users className="text-green-600" size={20} />
              <div>
                <p className="font-medium text-gray-900">Support Team</p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}