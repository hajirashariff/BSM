
import React, { useState } from 'react';

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const services = [
    {
      id: 1,
      name: 'IT Infrastructure',
      category: 'IT Services',
      status: 'operational',
      uptime: 99.9,
      sla: '99.5%',
      description: 'Core IT infrastructure including servers, networks, and storage systems',
      owner: 'IT Operations Team',
      lastUpdated: '2 hours ago',
      incidents: 2,
      dependencies: ['Network Services', 'Database Management']
    },
    {
      id: 2,
      name: 'Customer Support',
      category: 'Support Services',
      status: 'degraded',
      uptime: 95.2,
      sla: '99.0%',
      description: 'Customer support ticketing and communication systems',
      owner: 'Customer Success Team',
      lastUpdated: '1 hour ago',
      incidents: 5,
      dependencies: ['Email Services', 'IT Infrastructure']
    },
    {
      id: 3,
      name: 'Payment Processing',
      category: 'Business Services',
      status: 'operational',
      uptime: 99.8,
      sla: '99.9%',
      description: 'Secure payment processing and transaction management',
      owner: 'Finance Team',
      lastUpdated: '30 minutes ago',
      incidents: 1,
      dependencies: ['IT Infrastructure', 'Database Management']
    },
    {
      id: 4,
      name: 'Email Services',
      category: 'IT Services',
      status: 'operational',
      uptime: 99.5,
      sla: '99.0%',
      description: 'Corporate email and communication services',
      owner: 'IT Operations Team',
      lastUpdated: '4 hours ago',
      incidents: 3,
      dependencies: ['IT Infrastructure']
    },
    {
      id: 5,
      name: 'Database Management',
      category: 'Infrastructure',
      status: 'operational',
      uptime: 99.7,
      sla: '99.5%',
      description: 'Database hosting, backup, and management services',
      owner: 'Database Team',
      lastUpdated: '1 hour ago',
      incidents: 2,
      dependencies: ['IT Infrastructure']
    },
    {
      id: 6,
      name: 'Network Services',
      category: 'Infrastructure',
      status: 'outage',
      uptime: 87.3,
      sla: '99.0%',
      description: 'Network connectivity and routing services',
      owner: 'Network Team',
      lastUpdated: '15 minutes ago',
      incidents: 8,
      dependencies: []
    }
  ];

  const categories = ['all', 'IT Services', 'Business Services', 'Support Services', 'Infrastructure'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-400 bg-green-900/20';
      case 'degraded': return 'text-yellow-400 bg-yellow-900/20';
      case 'outage': return 'text-red-400 bg-red-900/20';
      default: return 'text-gray-400 bg-gray-900/20';
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

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setShowServiceModal(true);
  };

  const closeServiceModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const filteredServices = services
    .filter(service => {
      const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           service.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || service.status === selectedStatus;
      
      return matchesSearch && matchesCategory && matchesStatus;
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
          <h1 className="text-3xl font-bold text-white">Services</h1>
          <p className="text-gray-400 mt-1">Manage and monitor your business services</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium">
          + Add Service
        </button>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <input
              type="text"
              placeholder="Q Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-gray-700 text-white px-3 py-2 rounded-lg border border-gray-600"
          >
            <option value="all">All Status</option>
            <option value="operational">Operational</option>
            <option value="degraded">Degraded</option>
            <option value="outage">Outage</option>
          </select>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div 
            key={service.id} 
            className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-gray-600 transition-all duration-200 hover:shadow-lg cursor-pointer"
            onClick={() => handleServiceClick(service)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{getStatusIcon(service.status)}</span>
                <div>
                  <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                  <p className="text-sm text-gray-400">{service.category}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status)}`}>
                {service.status.toUpperCase()}
              </span>
            </div>

            <p className="text-gray-300 text-sm mb-4">{service.description}</p>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Uptime:</span>
                <span className="text-white font-medium">{service.uptime}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">SLA:</span>
                <span className="text-white font-medium">{service.sla}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Incidents:</span>
                <span className="text-white font-medium">{service.incidents}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Owner:</span>
                <span className="text-white font-medium">{service.owner}</span>
              </div>
            </div>

            {service.dependencies.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-gray-400 mb-2">Dependencies:</p>
                <div className="flex flex-wrap gap-1">
                  {service.dependencies.map((dep, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <span className="text-xs text-gray-400">Updated {service.lastUpdated}</span>
              <div className="flex space-x-2">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                  View Details
                </button>
                <button className="text-gray-400 hover:text-gray-300 text-sm">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-white mb-2">No services found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or filters</p>
        </div>
      )}

      {/* Service Details Modal */}
      {showServiceModal && selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">{getStatusIcon(selectedService.status)}</span>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedService.name}</h2>
                  <p className="text-gray-400">{selectedService.category}</p>
                </div>
              </div>
              <button
                onClick={closeServiceModal}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                <p className="text-gray-300">{selectedService.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Uptime</h4>
                  <p className="text-2xl font-bold text-white">{selectedService.uptime}%</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">SLA</h4>
                  <p className="text-2xl font-bold text-white">{selectedService.sla}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Incidents</h4>
                  <p className="text-2xl font-bold text-white">{selectedService.incidents}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Owner</h4>
                  <p className="text-lg font-medium text-white">{selectedService.owner}</p>
                </div>
              </div>

              {selectedService.dependencies.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Dependencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.dependencies.map((dep: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-600 text-white text-sm rounded-full">
                        {dep}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <button
                  onClick={closeServiceModal}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  View Incidents
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
