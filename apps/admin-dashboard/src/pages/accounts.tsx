import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  Users,
  Calendar,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  BarChart3,
  Target,
  Zap
} from 'lucide-react';

const accountData = [
  {
    id: 'ACC-001',
    name: 'Contoso Ltd',
    industry: 'Technology',
    size: 'Enterprise',
    health: 92,
    healthTrend: 'up',
    revenue: '$2.4M',
    renewal: '2024-12-15',
    status: 'Active',
    tickets: 3,
    openTickets: 1,
    resolvedTickets: 2,
    avgResolutionTime: '4.2h',
    satisfaction: 4.8,
    stakeholders: [
      { name: 'John Smith', role: 'CTO', email: 'john@contoso.com', phone: '+1-555-0123' },
      { name: 'Sarah Johnson', role: 'IT Director', email: 'sarah@contoso.com', phone: '+1-555-0124' }
    ],
    lastActivity: '2024-01-15',
    riskFactors: [],
    opportunities: ['Upsell: Additional licenses', 'Renewal: 3 months']
  },
  {
    id: 'ACC-002',
    name: 'Fabrikam Inc',
    industry: 'Manufacturing',
    size: 'Mid-Market',
    health: 78,
    healthTrend: 'down',
    revenue: '$890K',
    renewal: '2025-03-20',
    status: 'At Risk',
    tickets: 7,
    openTickets: 4,
    resolvedTickets: 3,
    avgResolutionTime: '8.5h',
    satisfaction: 3.2,
    stakeholders: [
      { name: 'Mike Chen', role: 'VP Operations', email: 'mike@fabrikam.com', phone: '+1-555-0125' }
    ],
    lastActivity: '2024-01-10',
    riskFactors: ['High ticket volume', 'Low satisfaction', 'Delayed payments'],
    opportunities: ['Support improvement', 'Training program']
  },
  {
    id: 'ACC-003',
    name: 'Adventure Works',
    industry: 'Retail',
    size: 'Enterprise',
    health: 85,
    healthTrend: 'stable',
    revenue: '$1.8M',
    renewal: '2024-11-30',
    status: 'Active',
    tickets: 2,
    openTickets: 0,
    resolvedTickets: 2,
    avgResolutionTime: '2.1h',
    satisfaction: 4.6,
    stakeholders: [
      { name: 'Lisa Wang', role: 'Head of IT', email: 'lisa@adventure.com', phone: '+1-555-0126' },
      { name: 'David Brown', role: 'Operations Manager', email: 'david@adventure.com', phone: '+1-555-0127' }
    ],
    lastActivity: '2024-01-14',
    riskFactors: [],
    opportunities: ['Expand to new regions', 'Additional services']
  },
  {
    id: 'ACC-004',
    name: 'Northwind Corp',
    industry: 'Finance',
    size: 'Enterprise',
    health: 95,
    healthTrend: 'up',
    revenue: '$3.2M',
    renewal: '2025-01-10',
    status: 'Champion',
    tickets: 1,
    openTickets: 0,
    resolvedTickets: 1,
    avgResolutionTime: '1.8h',
    satisfaction: 4.9,
    stakeholders: [
      { name: 'Robert Taylor', role: 'CISO', email: 'robert@northwind.com', phone: '+1-555-0128' },
      { name: 'Emily Davis', role: 'IT Manager', email: 'emily@northwind.com', phone: '+1-555-0129' }
    ],
    lastActivity: '2024-01-15',
    riskFactors: [],
    opportunities: ['Reference customer', 'Case study', 'Upsell: Premium support']
  }
];

const healthColors: Record<string, string> = {
  'Champion': 'bg-green-100 text-green-800',
  'Active': 'bg-blue-100 text-blue-800',
  'At Risk': 'bg-yellow-100 text-yellow-800',
  'Critical': 'bg-red-100 text-red-800'
};

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showInsights, setShowInsights] = useState(false);
  const [insights, setInsights] = useState('');

  // AI-powered account insights generator
  const generateAccountInsights = () => {
    const totalAccounts = accountData.length;
    const healthyAccounts = accountData.filter(a => a.status === 'Healthy').length;
    const atRiskAccounts = accountData.filter(a => a.status === 'At Risk').length;
    const criticalAccounts = accountData.filter(a => a.status === 'Critical').length;
    
    const avgHealth = accountData.reduce((sum, a) => sum + a.health, 0) / totalAccounts;
    const highValueAccounts = accountData.filter(a => a.health >= 85).length;
    const trendingUp = accountData.filter(a => a.healthTrend === 'up').length;
    const trendingDown = accountData.filter(a => a.healthTrend === 'down').length;
    
    const industries = [...new Set(accountData.map(a => a.industry))];
    const topIndustry = industries.reduce((top, industry) => {
      const count = accountData.filter(a => a.industry === industry).length;
      return count > top.count ? { industry, count } : top;
    }, { industry: '', count: 0 });
    
    return `📊 **Account Portfolio Analysis**

**Portfolio Health:**
• ${totalAccounts} total accounts managed
• ${healthyAccounts} healthy accounts (${((healthyAccounts/totalAccounts)*100).toFixed(1)}%)
• ${atRiskAccounts} at-risk accounts (${((atRiskAccounts/totalAccounts)*100).toFixed(1)}%)
• ${criticalAccounts} critical accounts requiring immediate attention

**Performance Metrics:**
• Average health score: ${avgHealth.toFixed(1)}%
• ${highValueAccounts} high-value accounts (85%+ health)
• ${trendingUp} accounts trending up
• ${trendingDown} accounts trending down

**Industry Distribution:**
• Top industry: ${topIndustry.industry} (${topIndustry.count} accounts)
• Industry diversity: ${industries.length} different sectors

**AI Recommendations:**
• **Immediate Action:** ${criticalAccounts > 0 ? `Address ${criticalAccounts} critical account(s)` : 'No critical accounts - good health'}
• **Growth Opportunity:** ${highValueAccounts} accounts ready for expansion
• **Risk Mitigation:** ${atRiskAccounts} accounts need proactive engagement
• **Portfolio Optimization:** ${trendingDown > 0 ? `Investigate ${trendingDown} declining account(s)` : 'All accounts stable or improving'}

**Strategic Insights:**
• Focus on ${topIndustry.industry} sector for growth
• Implement health monitoring for at-risk accounts
• Create retention campaigns for trending down accounts
• Leverage high-value accounts for referrals and expansion

**Next Steps:**
• Schedule health check calls with at-risk accounts
• Develop industry-specific engagement strategies
• Set up automated health monitoring alerts
• Create account success playbooks by industry`;
  };

  const getProgressBarClass = (health: number) => {
    if (health >= 90) return 'progress-bar-90';
    if (health >= 85) return 'progress-bar-85';
    if (health >= 80) return 'progress-bar-78';
    return 'progress-bar-78';
  };

  const filteredAccounts = accountData.filter(account => {
    const matchesStatus = filterStatus === 'All' || account.status === filterStatus;
    const matchesSearch = account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         account.industry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalRevenue = accountData.reduce((sum, acc) => sum + parseFloat(acc.revenue.replace('$', '').replace('M', '')), 0);
  const avgHealth = Math.round(accountData.reduce((sum, acc) => sum + acc.health, 0) / accountData.length);
  const renewalRisk = accountData.filter(acc => acc.status === 'At Risk' || acc.status === 'Critical').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Management</h1>
          <p className="text-gray-600">Deep B2B account management with health scoring and stakeholder mapping</p>
        </div>
        <button className="btn-primary flex items-center space-x-2">
          <Plus size={20} />
          <span>Add Account</span>
        </button>
      </div>

      {/* Account Overview KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(1)}M</p>
              <p className="text-sm text-green-600">+12% from last quarter</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50">
              <DollarSign className="text-green-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Health</p>
              <p className="text-2xl font-bold text-gray-900">{avgHealth}%</p>
              <p className="text-sm text-green-600">+3% from last month</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">At Risk Accounts</p>
              <p className="text-2xl font-bold text-gray-900">{renewalRisk}</p>
              <p className="text-sm text-red-600">Requires attention</p>
            </div>
            <div className="p-3 rounded-lg bg-red-50">
              <AlertTriangle className="text-red-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Renewals</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-yellow-600">Next 30 days</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50">
              <Calendar className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* AI-Powered Insights */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Zap className="text-blue-600" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Account Insights</h3>
          </div>
          <button
            onClick={() => {
              // Generate intelligent insights based on current account data
              const generatedInsights = generateAccountInsights();
              setInsights(generatedInsights);
              setShowInsights(true);
            }}
            className="btn-secondary flex items-center space-x-2 text-sm"
          >
            <Zap size={16} />
            <span>Get Detailed Insights</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="text-green-600" size={16} />
              <span className="font-medium">Upsell Opportunities</span>
            </div>
            <p className="text-sm text-gray-600">$1.2M potential revenue identified</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="text-red-600" size={16} />
              <span className="font-medium">Churn Risk</span>
            </div>
            <p className="text-sm text-gray-600">2 accounts flagged for intervention</p>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-blue-600" size={16} />
              <span className="font-medium">Growth Potential</span>
            </div>
            <p className="text-sm text-gray-600">15% expansion opportunity</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Status</option>
              <option value="Champion">Champion</option>
              <option value="Active">Active</option>
              <option value="At Risk">At Risk</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <span className="text-sm text-gray-600">Advanced Filters</span>
          </div>
        </div>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAccounts.map((account) => (
          <div key={account.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{account.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${healthColors[account.status]}`}>
                    {account.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{account.industry} • {account.size}</p>
                
                {/* Health Score */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Health Score</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-600">{account.health}%</span>
                      {account.healthTrend === 'up' ? (
                        <TrendingUp className="text-green-600" size={16} />
                      ) : account.healthTrend === 'down' ? (
                        <TrendingDown className="text-red-600" size={16} />
                      ) : (
                        <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
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
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="font-semibold text-gray-900">{account.revenue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Renewal</p>
                    <p className="font-semibold text-gray-900">{account.renewal}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Tickets</p>
                    <p className="font-semibold text-gray-900">{account.tickets}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Satisfaction</p>
                    <p className="font-semibold text-gray-900">{account.satisfaction}/5</p>
                  </div>
                </div>

                {/* Stakeholders */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Key Stakeholders</p>
                  <div className="space-y-1">
                    {account.stakeholders.slice(0, 2).map((stakeholder, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <Users size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{stakeholder.name}</span>
                        <span className="text-xs text-gray-500">({stakeholder.role})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Factors / Opportunities */}
                <div className="mb-4">
                  {account.riskFactors.length > 0 && (
                    <div className="mb-2">
                      <p className="text-sm font-medium text-red-700 mb-1">Risk Factors</p>
                      <div className="flex flex-wrap gap-1">
                        {account.riskFactors.map((risk, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                            {risk}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {account.opportunities.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-green-700 mb-1">Opportunities</p>
                      <div className="flex flex-wrap gap-1">
                        {account.opportunities.map((opp, idx) => (
                          <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                            {opp}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ExternalLink size={16} className="text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Mail size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500">Last activity: {account.lastActivity}</span>
              </div>
              <button className="btn-primary text-sm">View Details</button>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insights Modal */}
      {showInsights && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Zap className="text-blue-600" size={24} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">AI Account Insights</h2>
              </div>
              <button
                onClick={() => setShowInsights(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {insights}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowInsights(false)}
                className="btn-secondary"
              >
                Close
              </button>
              <button
                onClick={() => {
                  const generatedInsights = generateAccountInsights();
                  setInsights(generatedInsights);
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Zap size={16} />
                <span>Refresh Insights</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



