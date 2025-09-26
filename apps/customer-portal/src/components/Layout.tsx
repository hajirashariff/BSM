import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const navigationItems = [
    { id: 'dashboard', label: 'Home', icon: '📊' },
    { id: 'services', label: 'Services', icon: '⚙️' },
    { id: 'incidents', label: 'Incidents', icon: '🚨' },
    { id: 'knowledge', label: 'Knowledge Base', icon: '📚' },
    { id: 'reports', label: 'Reports', icon: '📈' },
  ];

  const recentServices = [
    'IT Infrastructure',
    'Customer Support',
    'Payment Processing',
    'Email Services',
    'Database Management'
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Navigation */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-blue-400">BSM</div>
            <div className="text-sm text-gray-300">Business Service Management</div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Q Search services..."
                className="bg-gray-700 text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-2.5 text-gray-400">Q</span>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
              + Create
            </button>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                🔔
              </button>
              <button className="p-2 hover:bg-gray-700 rounded-lg">
                ❓
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 min-h-screen border-r border-gray-700">
          <div className="p-4">
            {/* Main Navigation */}
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === item.id
                      ? 'bg-gray-700 text-blue-400'
                      : 'hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Recent Services */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Recent Services
              </h3>
              <div className="space-y-1">
                {recentServices.map((service, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>

            {/* Service Categories */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Service Categories
              </h3>
              <div className="space-y-1">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
                  🏢 Business Services
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
                  💻 IT Services
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
                  🔧 Infrastructure
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
                  👥 Support Services
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                Quick Actions
              </h3>
              <div className="space-y-1">
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
                  📋 View all services
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
                  🔍 Filters
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
                  📊 Home
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
                  ⚙️ Operations
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
                  🎯 Goals
                </button>
                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-lg">
                  👥 Teams
                </button>
              </div>
            </div>

            {/* Feedback */}
            <div className="mt-8 pt-4 border-t border-gray-700">
              <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-gray-300">
                Customize sidebar
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-gray-400 hover:text-gray-300">
                Give feedback on the new...
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-900">
          {children}
        </div>
      </div>
    </div>
  );
}


