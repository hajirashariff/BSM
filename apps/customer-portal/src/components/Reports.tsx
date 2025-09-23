import React, { useState } from 'react';

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [selectedReport, setSelectedReport] = useState('overview');

  const reportData = {
    overview: {
      title: 'Service Overview Report',
      description: 'Comprehensive overview of all services and their performance metrics',
      metrics: [
        { name: 'Total Services', value: 47, change: '+2', trend: 'up' },
        { name: 'Average Uptime', value: '99.2%', change: '+0.3%', trend: 'up' },
        { name: 'Critical Incidents', value: 3, change: '-1', trend: 'down' },
        { name: 'SLA Compliance', value: '98.7%', change: '+0.5%', trend: 'up' }
      ]
    },
    incidents: {
      title: 'Incident Analysis Report',
      description: 'Detailed analysis of incidents, resolution times, and trends',
      metrics: [
        { name: 'Total Incidents', value: 127, change: '+15', trend: 'up' },
        { name: 'Avg Resolution Time', value: '4.2h', change: '-0.8h', trend: 'down' },
        { name: 'Critical Resolved', value: 8, change: '+2', trend: 'up' },
        { name: 'Customer Impact', value: 'Low', change: 'Stable', trend: 'stable' }
      ]
    },
    performance: {
      title: 'Performance Metrics Report',
      description: 'Service performance metrics and capacity utilization',
      metrics: [
        { name: 'CPU Utilization', value: '68%', change: '+5%', trend: 'up' },
        { name: 'Memory Usage', value: '72%', change: '-2%', trend: 'down' },
        { name: 'Network Throughput', value: '1.2TB', change: '+0.3TB', trend: 'up' },
        { name: 'Storage Capacity', value: '85%', change: '+3%', trend: 'up' }
      ]
    }
  };

  const servicePerformance = [
    { name: 'IT Infrastructure', uptime: 99.9, incidents: 2, responseTime: '1.2h', sla: 99.5 },
    { name: 'Customer Support', uptime: 95.2, incidents: 5, responseTime: '3.4h', sla: 99.0 },
    { name: 'Payment Processing', uptime: 99.8, incidents: 1, responseTime: '0.8h', sla: 99.9 },
    { name: 'Email Services', uptime: 99.5, incidents: 3, responseTime: '2.1h', sla: 99.0 },
    { name: 'Database Management', uptime: 99.7, incidents: 2, responseTime: '1.5h', sla: 99.5 },
    { name: 'Network Services', uptime: 87.3, incidents: 8, responseTime: '6.2h', sla: 99.0 }
  ];

  const incidentTrends = [
    { month: 'Jan', incidents: 45, resolved: 42, avgTime: '3.2h' },
    { month: 'Feb', incidents: 38, resolved: 40, avgTime: '2.8h' },
    { month: 'Mar', incidents: 52, resolved: 48, avgTime: '4.1h' },
    { month: 'Apr', incidents: 41, resolved: 43, avgTime: '3.5h' },
    { month: 'May', incidents: 48, resolved: 45, avgTime: '3.8h' },
    { month: 'Jun', incidents: 35, resolved: 38, avgTime: '2.9h' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const currentReport = reportData[selectedReport as keyof typeof reportData];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports & Analytics</h1>
          <p className="text-gray-400 mt-1">Comprehensive reports and performance analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600"
          >
            <option value="24h">Last 24 hours</option>
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
            Export Report
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex space-x-4">
          {Object.entries(reportData).map(([key, report]) => (
            <button
              key={key}
              onClick={() => setSelectedReport(key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedReport === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {report.title}
            </button>
          ))}
        </div>
      </div>

      {/* Report Header */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-2">{currentReport.title}</h2>
        <p className="text-gray-400 mb-4">{currentReport.description}</p>
        <div className="text-sm text-gray-400">
          Generated on {new Date().toLocaleDateString()} • Period: {selectedPeriod}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {currentReport.metrics.map((metric, index) => (
          <div key={index} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-400">{metric.name}</h3>
              <span className={`text-lg ${getTrendColor(metric.trend)}`}>
                {getTrendIcon(metric.trend)}
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
            <div className={`text-sm ${getTrendColor(metric.trend)}`}>
              {metric.change} from last period
            </div>
          </div>
        ))}
      </div>

      {/* Service Performance Table */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Service Performance</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Service</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Uptime</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Incidents</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Response Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">SLA</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {servicePerformance.map((service, index) => (
                <tr key={index} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4 text-white font-medium">{service.name}</td>
                  <td className="py-3 px-4 text-white">{service.uptime}%</td>
                  <td className="py-3 px-4 text-white">{service.incidents}</td>
                  <td className="py-3 px-4 text-white">{service.responseTime}</td>
                  <td className="py-3 px-4 text-white">{service.sla}%</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.uptime >= 99 ? 'text-green-400 bg-green-900/20' :
                      service.uptime >= 95 ? 'text-yellow-400 bg-yellow-900/20' :
                      'text-red-400 bg-red-900/20'
                    }`}>
                      {service.uptime >= 99 ? 'EXCELLENT' :
                       service.uptime >= 95 ? 'GOOD' : 'NEEDS ATTENTION'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Trends Chart */}
      <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
        <h3 className="text-xl font-semibold text-white mb-4">Incident Trends</h3>
        <div className="space-y-4">
          {incidentTrends.map((month, index) => (
            <div key={index} className="flex items-center">
              <div className="w-16 text-sm text-gray-400">{month.month}</div>
              <div className="flex-1 mx-4">
                <div className="flex space-x-2 mb-1">
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-red-500 h-2 rounded-full" 
                      style={{ width: `${(month.incidents / 60) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex-1 bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(month.resolved / 60) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="w-20 text-right text-sm text-gray-400">
                Avg: {month.avgTime}
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

      {/* Summary and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Summary</h3>
          <div className="space-y-3 text-sm text-gray-300">
            <p>• Overall service health is good with 99.2% average uptime</p>
            <p>• Incident resolution times have improved by 15% this month</p>
            <p>• Network Services requires immediate attention due to low uptime</p>
            <p>• SLA compliance is above target at 98.7%</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Recommendations</h3>
          <div className="space-y-3 text-sm text-gray-300">
            <p>• Investigate Network Services infrastructure issues</p>
            <p>• Implement proactive monitoring for Payment Processing</p>
            <p>• Review Customer Support response procedures</p>
            <p>• Consider capacity planning for growing demand</p>
          </div>
        </div>
      </div>
    </div>
  );
}


