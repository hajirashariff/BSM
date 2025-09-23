import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [selectedMetric, setSelectedMetric] = useState('uptime');
  const [expandedCards, setExpandedCards] = useState<{[key: string]: boolean}>({});
  const [hoveredData, setHoveredData] = useState<any>(null);
  const [realTimeData, setRealTimeData] = useState({
    totalServices: 47,
    activeIncidents: 12,
    resolvedToday: 8,
    avgResponseTime: '2.3h'
  });

  // Simulate real-time data updates
  useEffect(() => {
    if (!isAutoRefresh) return;
    
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeIncidents: Math.max(0, prev.activeIncidents + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0)),
        resolvedToday: prev.resolvedToday + (Math.random() > 0.8 ? 1 : 0),
        avgResponseTime: `${(Math.random() * 2 + 1).toFixed(1)}h`
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoRefresh]);

  const serviceHealthData = [
    { name: 'IT Infrastructure', status: 'operational', uptime: 99.9, incidents: 2 },
    { name: 'Customer Support', status: 'degraded', uptime: 95.2, incidents: 5 },
    { name: 'Payment Processing', status: 'operational', uptime: 99.8, incidents: 1 },
    { name: 'Email Services', status: 'operational', uptime: 99.5, incidents: 3 },
    { name: 'Database Management', status: 'operational', uptime: 99.7, incidents: 2 },
    { name: 'Network Services', status: 'outage', uptime: 87.3, incidents: 8 },
  ];

  const incidentTrends = [
    { day: 'Mon', incidents: 12, resolved: 8 },
    { day: 'Tue', incidents: 8, resolved: 10 },
    { day: 'Wed', incidents: 15, resolved: 12 },
    { day: 'Thu', incidents: 6, resolved: 9 },
    { day: 'Fri', incidents: 10, resolved: 7 },
    { day: 'Sat', incidents: 4, resolved: 5 },
    { day: 'Sun', incidents: 3, resolved: 4 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'outage': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return '🟢';
      case 'degraded': return '🟡';
      case 'outage': return '🔴';
      default: return '⚪';
    }
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const handleChartHover = (data: any) => {
    setHoveredData(data);
  };

  const handleChartLeave = () => {
    setHoveredData(null);
  };

  const refreshData = () => {
    setRealTimeData(prev => ({
      ...prev,
      activeIncidents: Math.max(0, prev.activeIncidents + (Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0)),
      resolvedToday: prev.resolvedToday + (Math.random() > 0.8 ? 1 : 0),
      avgResponseTime: `${(Math.random() * 2 + 1).toFixed(1)}h`
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Service Dashboard</h1>
          <p className="text-gray-400 mt-1">Real-time service health and performance metrics</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Auto-refresh:</span>
            <button
              onClick={() => setIsAutoRefresh(!isAutoRefresh)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                isAutoRefresh ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              {isAutoRefresh ? 'ON' : 'OFF'}
            </button>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
          </select>
          <button
            onClick={refreshData}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-200 hover:shadow-lg"
          onClick={() => toggleCardExpansion('totalServices')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Services</p>
              <p className="text-3xl font-bold text-white">{realTimeData.totalServices}</p>
            </div>
            <div className="text-3xl">⚙️</div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-400">
            <span>+2 this week</span>
          </div>
          {expandedCards.totalServices && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Operational:</span>
                  <span className="text-green-400">42</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Degraded:</span>
                  <span className="text-yellow-400">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Outage:</span>
                  <span className="text-red-400">2</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div 
          className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-200 hover:shadow-lg"
          onClick={() => toggleCardExpansion('activeIncidents')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Incidents</p>
              <p className="text-3xl font-bold text-white">{realTimeData.activeIncidents}</p>
            </div>
            <div className="text-3xl">🚨</div>
          </div>
          <div className="mt-4 flex items-center text-sm text-red-400">
            <span>+3 from yesterday</span>
          </div>
          {expandedCards.activeIncidents && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Critical:</span>
                  <span className="text-red-400">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">High:</span>
                  <span className="text-orange-400">4</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Medium:</span>
                  <span className="text-yellow-400">6</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div 
          className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-200 hover:shadow-lg"
          onClick={() => toggleCardExpansion('resolvedToday')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Resolved Today</p>
              <p className="text-3xl font-bold text-white">{realTimeData.resolvedToday}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-400">
            <span>+12% from yesterday</span>
          </div>
          {expandedCards.resolvedToday && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Avg Resolution:</span>
                  <span className="text-white">2.3h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">SLA Met:</span>
                  <span className="text-green-400">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">First Response:</span>
                  <span className="text-blue-400">15min</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div 
          className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-200 hover:shadow-lg"
          onClick={() => toggleCardExpansion('avgResponseTime')}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Avg Response Time</p>
              <p className="text-3xl font-bold text-white">{realTimeData.avgResponseTime}</p>
            </div>
            <div className="text-3xl">⏱️</div>
          </div>
          <div className="mt-4 flex items-center text-sm text-yellow-400">
            <span>-15% improvement</span>
          </div>
          {expandedCards.avgResponseTime && (
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Target:</span>
                  <span className="text-white">4h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Best Today:</span>
                  <span className="text-green-400">0.5h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Worst Today:</span>
                  <span className="text-red-400">6.2h</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Service Health Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Service Health Status</h3>
          <div className="space-y-3">
            {serviceHealthData.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getStatusIcon(service.status)}</span>
                  <div>
                    <p className="font-medium text-white">{service.name}</p>
                    <p className="text-sm text-gray-400">{service.uptime}% uptime</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-medium ${getStatusColor(service.status)}`}>
                    {service.status.toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-400">{service.incidents} incidents</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Trends Chart */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Incident Trends</h3>
          <div className="space-y-4">
            {incidentTrends.map((day, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-400 w-12">{day.day}</span>
                <div className="flex-1 mx-4">
                  <div className="flex space-x-2">
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full" 
                        style={{ width: `${(day.incidents / 20) * 100}%` }}
                      ></div>
                    </div>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(day.resolved / 20) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm">
                  <span className="text-red-400">{day.incidents}</span>
                  <span className="text-gray-400 mx-1">/</span>
                  <span className="text-green-400">{day.resolved}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-400">Incidents</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-400">Resolved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { type: 'incident', service: 'Payment Processing', message: 'High transaction volume detected', time: '2 minutes ago', status: 'investigating' },
            { type: 'resolution', service: 'Email Services', message: 'Outage resolved - all services restored', time: '15 minutes ago', status: 'resolved' },
            { type: 'maintenance', service: 'Database Management', message: 'Scheduled maintenance completed', time: '1 hour ago', status: 'completed' },
            { type: 'incident', service: 'Network Services', message: 'Partial connectivity issues reported', time: '2 hours ago', status: 'monitoring' },
            { type: 'deployment', service: 'Customer Support', message: 'New features deployed successfully', time: '3 hours ago', status: 'completed' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-700 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'incident' ? 'bg-red-500' :
                activity.type === 'resolution' ? 'bg-green-500' :
                activity.type === 'maintenance' ? 'bg-blue-500' : 'bg-purple-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-white font-medium">{activity.service}</p>
                <p className="text-gray-400 text-sm">{activity.message}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">{activity.time}</p>
                <p className={`text-xs font-medium ${
                  activity.status === 'resolved' ? 'text-green-400' :
                  activity.status === 'investigating' ? 'text-red-400' :
                  activity.status === 'monitoring' ? 'text-yellow-400' : 'text-blue-400'
                }`}>
                  {activity.status.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
