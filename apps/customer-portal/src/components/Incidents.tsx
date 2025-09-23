import React, { useState } from 'react';

export default function Incidents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState('desc');

  const incidents = [
    {
      id: 'INC-001',
      title: 'Payment Processing High Volume Alert',
      description: 'Transaction processing system experiencing high load due to increased customer activity',
      priority: 'high',
      status: 'investigating',
      service: 'Payment Processing',
      assignee: 'John Smith',
      reporter: 'System Alert',
      created: '2 hours ago',
      updated: '30 minutes ago',
      estimatedResolution: '4 hours',
      impact: 'High transaction delays reported by customers'
    },
    {
      id: 'INC-002',
      title: 'Email Service Outage',
      description: 'Corporate email services are down affecting all users',
      priority: 'critical',
      status: 'resolved',
      service: 'Email Services',
      assignee: 'Sarah Johnson',
      reporter: 'IT Operations',
      created: '6 hours ago',
      updated: '1 hour ago',
      estimatedResolution: 'Resolved',
      impact: 'All email communication disrupted'
    },
    {
      id: 'INC-003',
      title: 'Database Performance Issues',
      description: 'Slow query response times affecting multiple applications',
      priority: 'medium',
      status: 'in_progress',
      service: 'Database Management',
      assignee: 'Mike Chen',
      reporter: 'Application Team',
      created: '4 hours ago',
      updated: '1 hour ago',
      estimatedResolution: '2 hours',
      impact: 'Application response times degraded'
    },
    {
      id: 'INC-004',
      title: 'Network Connectivity Problems',
      description: 'Intermittent network connectivity issues in data center',
      priority: 'high',
      status: 'monitoring',
      service: 'Network Services',
      assignee: 'Alex Rodriguez',
      reporter: 'Network Team',
      created: '3 hours ago',
      updated: '45 minutes ago',
      estimatedResolution: '6 hours',
      impact: 'Partial service availability'
    },
    {
      id: 'INC-005',
      title: 'Customer Support System Slow',
      description: 'Customer support ticketing system responding slowly',
      priority: 'low',
      status: 'investigating',
      service: 'Customer Support',
      assignee: 'Lisa Wang',
      reporter: 'Support Team',
      created: '1 hour ago',
      updated: '15 minutes ago',
      estimatedResolution: '3 hours',
      impact: 'Support response times increased'
    },
    {
      id: 'INC-006',
      title: 'Scheduled Maintenance Window',
      description: 'Planned maintenance for infrastructure updates',
      priority: 'low',
      status: 'scheduled',
      service: 'IT Infrastructure',
      assignee: 'Tom Wilson',
      reporter: 'IT Operations',
      created: '1 day ago',
      updated: '2 hours ago',
      estimatedResolution: '4 hours',
      impact: 'Scheduled downtime for maintenance'
    }
  ];

  const priorities = ['all', 'critical', 'high', 'medium', 'low'];
  const statuses = ['all', 'investigating', 'in_progress', 'monitoring', 'resolved', 'scheduled'];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400 bg-red-900/20 border-red-500';
      case 'high': return 'text-orange-400 bg-orange-900/20 border-orange-500';
      case 'medium': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500';
      case 'low': return 'text-blue-400 bg-blue-900/20 border-blue-500';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'investigating': return 'text-red-400 bg-red-900/20';
      case 'in_progress': return 'text-yellow-400 bg-yellow-900/20';
      case 'monitoring': return 'text-blue-400 bg-blue-900/20';
      case 'resolved': return 'text-green-400 bg-green-900/20';
      case 'scheduled': return 'text-purple-400 bg-purple-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return '🔴';
      case 'high': return '🟠';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      default: return '⚪';
    }
  };

  const handleIncidentClick = (incident: any) => {
    setSelectedIncident(incident);
    setShowIncidentModal(true);
  };

  const closeIncidentModal = () => {
    setShowIncidentModal(false);
    setSelectedIncident(null);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredIncidents = incidents
    .filter(incident => {
      const matchesSearch = incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           incident.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           incident.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = selectedPriority === 'all' || incident.priority === selectedPriority;
      const matchesStatus = selectedStatus === 'all' || incident.status === selectedStatus;
      
      return matchesSearch && matchesPriority && matchesStatus;
    })
    .sort((a, b) => {
      let aValue = a[sortBy as keyof typeof a];
      let bValue = b[sortBy as keyof typeof b];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white">Incidents</h1>
          <p className="text-gray-400 mt-1">Track and manage service incidents and outages</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
          + Create Incident
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Q Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>
                {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600"
          >
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Incidents List */}
      <div className="space-y-4">
        {filteredIncidents.map((incident) => (
          <div 
            key={incident.id} 
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg cursor-pointer"
            onClick={() => handleIncidentClick(incident)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <span className="text-2xl">{getPriorityIcon(incident.priority)}</span>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(incident.priority)}`}>
                      {incident.priority.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(incident.status)}`}>
                      {incident.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">{incident.description}</p>
                  <p className="text-red-300 text-sm font-medium">Impact: {incident.impact}</p>
                </div>
              </div>
              <div className="text-right text-sm text-gray-400">
                <p>{incident.id}</p>
                <p>Created {incident.created}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Service</p>
                <p className="text-white font-medium">{incident.service}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Assignee</p>
                <p className="text-white font-medium">{incident.assignee}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Reporter</p>
                <p className="text-white font-medium">{incident.reporter}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wide">Est. Resolution</p>
                <p className="text-white font-medium">{incident.estimatedResolution}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <span className="text-xs text-gray-400">Last updated {incident.updated}</span>
              <div className="flex space-x-2">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View Details
                </button>
                <button className="text-gray-400 hover:text-gray-300 text-sm">
                  Update
                </button>
                <button className="text-gray-400 hover:text-gray-300 text-sm">
                  Comment
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredIncidents.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No incidents found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Incident Details Modal */}
      {showIncidentModal && selectedIncident && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{getPriorityIcon(selectedIncident.priority)}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedIncident.title}</h2>
                  <p className="text-gray-400">{selectedIncident.id}</p>
                </div>
              </div>
              <button
                onClick={closeIncidentModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300">{selectedIncident.description}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Impact</h3>
                <p className="text-gray-300">{selectedIncident.impact}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Priority</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedIncident.priority)}`}>
                    {selectedIncident.priority.toUpperCase()}
                  </span>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Status</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedIncident.status)}`}>
                    {selectedIncident.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Service</h4>
                  <p className="text-lg font-medium text-white">{selectedIncident.service}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Assignee</h4>
                  <p className="text-lg font-medium text-white">{selectedIncident.assignee}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Reporter</h4>
                  <p className="text-lg font-medium text-white">{selectedIncident.reporter}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Est. Resolution</h4>
                  <p className="text-lg font-medium text-white">{selectedIncident.estimatedResolution}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Created</h4>
                  <p className="text-white">{selectedIncident.created}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Last Updated</h4>
                  <p className="text-white">{selectedIncident.updated}</p>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  onClick={closeIncidentModal}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  Update Status
                </button>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
