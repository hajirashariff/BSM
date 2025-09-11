import React from 'react';
import { 
  Ticket, 
  Building2, 
  Server, 
  TrendingUp, 
  Clock, 
  Users, 
  AlertTriangle,
  CheckCircle,
  BarChart3,
  Activity
} from 'lucide-react';

const kpiCards = [
  {
    title: 'Open Tickets',
    value: '247',
    change: '+12%',
    changeType: 'increase',
    icon: Ticket,
    color: 'text-blue-600'
  },
  {
    title: 'Active Accounts',
    value: '89',
    change: '+5%',
    changeType: 'increase',
    icon: Building2,
    color: 'text-green-600'
  },
  {
    title: 'Managed Assets',
    value: '1,234',
    change: '+8%',
    changeType: 'increase',
    icon: Server,
    color: 'text-purple-600'
  },
  {
    title: 'Avg Response Time',
    value: '2.4h',
    change: '-15%',
    changeType: 'decrease',
    icon: Clock,
    color: 'text-orange-600'
  }
];

const recentTickets = [
  { id: 'TCK-2024-001', subject: 'VPN connectivity issues', priority: 'High', status: 'Open', assignee: 'John Doe', created: '2 hours ago' },
  { id: 'TCK-2024-002', subject: 'Email server maintenance', priority: 'Medium', status: 'In Progress', assignee: 'Jane Smith', created: '4 hours ago' },
  { id: 'TCK-2024-003', subject: 'New user onboarding', priority: 'Low', status: 'Resolved', assignee: 'Mike Johnson', created: '6 hours ago' },
  { id: 'TCK-2024-004', subject: 'Software license renewal', priority: 'High', status: 'Open', assignee: 'Sarah Wilson', created: '8 hours ago' },
];

const accountHealth = [
  { name: 'Contoso Ltd', health: 92, tickets: 3, renewal: '2024-12-15' },
  { name: 'Fabrikam Inc', health: 78, tickets: 7, renewal: '2025-03-20' },
  { name: 'Adventure Works', health: 85, tickets: 2, renewal: '2024-11-30' },
  { name: 'Northwind Corp', health: 95, tickets: 1, renewal: '2025-01-10' },
];

export default function Dashboard() {
  const getProgressBarClass = (health: number) => {
    if (health >= 90) return 'progress-bar-90';
    if (health >= 85) return 'progress-bar-85';
    if (health >= 80) return 'progress-bar-78';
    return 'progress-bar-78';
  };

  return (
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
            <h3 className="text-lg font-semibold text-gray-900">Recent Service Requests</h3>
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

        {/* Account Health */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Account Health Overview</h3>
            <button className="btn-secondary text-sm">View All</button>
          </div>
          <div className="space-y-4">
            {accountHealth.map((account, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{account.name}</span>
                    <span className="text-sm text-gray-600">{account.health}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`progress-bar ${getProgressBarClass(account.health)} ${
                        account.health >= 90 ? 'bg-green-500' :
                        account.health >= 80 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between mt-1 text-xs text-gray-500">
                    <span>{account.tickets} active tickets</span>
                    <span>Renewal: {account.renewal}</span>
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
          <button className="btn-primary flex items-center justify-center space-x-2">
            <Ticket size={20} />
            <span>Create Ticket</span>
          </button>
          <button className="btn-secondary flex items-center justify-center space-x-2">
            <Building2 size={20} />
            <span>Add Account</span>
          </button>
          <button className="btn-secondary flex items-center justify-center space-x-2">
            <Server size={20} />
            <span>Register Asset</span>
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle className="text-green-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">API Services</p>
              <p className="text-sm text-gray-600">All systems operational</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="text-yellow-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">Database</p>
              <p className="text-sm text-gray-600">Minor performance issues</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
            <Activity className="text-green-600" size={20} />
            <div>
              <p className="font-medium text-gray-900">Workflows</p>
              <p className="text-sm text-gray-600">Running normally</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


