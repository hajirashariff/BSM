import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import ModernLayout from '../components/ModernLayout';
import { useAuth } from '../contexts/AuthContext';
import { serviceService, realtimeService } from '../lib/supabaseService';
import { 
  Plus,
  Clock,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Activity,
  Filter,
  SortAsc,
  ExternalLink,
  RefreshCw,
  Loader2
} from 'lucide-react';

// Import Service interface from Supabase service
import { Service } from '../lib/supabaseService';

export default function Services() {
  const { user } = useAuth();
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isClient, setIsClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load services from Supabase
  useEffect(() => {
    const loadServices = async () => {
      if (!isClient) return;
      
      try {
        setLoading(true);
        const servicesData = await serviceService.getServices();
        setServices(servicesData || []);
      } catch (error) {
        console.error('Error loading services:', error);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, [isClient]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!isClient) return;

    const subscription = realtimeService.subscribeToServices((payload) => {
      console.log('Service update received:', payload);
      // Refresh services when changes occur
      serviceService.getServices().then(setServices);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [isClient]);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const servicesData = await serviceService.getServices();
      setServices(servicesData || []);
    } catch (error) {
      console.error('Error refreshing services:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const filteredServices = services.filter(service => {
    const categoryMatch = filterCategory === 'All' || service.category === filterCategory;
    const statusMatch = filterStatus === 'All' || 
      (filterStatus === 'Operational' && service.status === 'operational') ||
      (filterStatus === 'Minor Issues' && service.status === 'minor_issues') ||
      (filterStatus === 'Outage' && service.status === 'outage') ||
      (filterStatus === 'Maintenance' && service.status === 'maintenance');
    const searchMatch = searchTerm === '' || 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && statusMatch && searchMatch;
  });

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

  const getHealthColor = (health: number) => {
    if (health >= 95) return 'text-green-600';
    if (health >= 90) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusColor = (status: string) => {
    if (status === 'operational') return 'bg-green-100 text-green-800';
    if (status === 'minor_issues') return 'bg-yellow-100 text-yellow-800';
    if (status === 'maintenance') return 'bg-blue-100 text-blue-800';
    return 'bg-red-100 text-red-800';
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'operational': return 'Operational';
      case 'minor_issues': return 'Minor Issues';
      case 'major_issues': return 'Major Issues';
      case 'maintenance': return 'Maintenance';
      case 'outage': return 'Outage';
      default: return status;
    }
  };

  return (
    <ModernLayout>
      <Head>
        <title>Services - BSM Customer Portal</title>
        <meta name="description" content="View available services and their status" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 dark:bg-zinc-900 dark:border-zinc-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-zinc-100">
                  Services
                </h2>
              </div>
              
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="btn-secondary flex items-center space-x-2"
                >
                  {refreshing ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <RefreshCw size={20} />
                  )}
                  <span>Refresh</span>
                </button>
                <button className="btn-primary flex items-center space-x-2">
                  <Plus size={20} />
                  <span>Request Service</span>
                </button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <main className="p-6">
            <div className="space-y-6">
              {/* Filters */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button className="btn-secondary text-sm flex items-center space-x-2">
                    <Filter size={16} />
                    <span>Advanced Filters</span>
                  </button>
                </div>
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="input-field w-40"
                    >
                      <option value="All">All Categories</option>
                      <option value="Communication">Communication</option>
                      <option value="Storage">Storage</option>
                      <option value="Data">Data</option>
                      <option value="Integration">Integration</option>
                      <option value="Security">Security</option>
                      <option value="Monitoring">Monitoring</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select 
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="input-field w-40"
                    >
                      <option value="All">All Status</option>
                      <option value="Operational">Operational</option>
                      <option value="Minor Issues">Minor Issues</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Outage">Outage</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Services Grid */}
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                    <p className="mt-2 text-gray-600">Loading services...</p>
                  </div>
                </div>
              ) : filteredServices.length === 0 ? (
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
                  <p className="text-gray-600">Try adjusting your filters or check back later.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                  <div key={service.id} className="card hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                        <p className="text-gray-600 text-sm mb-3">{service.description || 'No description available'}</p>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(service.status)}`}>
                            {getStatusLabel(service.status)}
                          </span>
                          <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                            {service.category}
                          </span>
                        </div>
                      </div>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Health Score</span>
                        <span className={`text-sm font-semibold ${getHealthColor(service.health_score)}`}>
                          {service.health_score}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            service.health_score >= 95 ? 'bg-green-500' :
                            service.health_score >= 90 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${service.health_score}%` }}
                        ></div>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Last updated: {new Date(service.last_updated).toLocaleString()}
                      </div>
                      
                      <div className="pt-3 border-t border-gray-200">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Features:</h4>
                        <div className="flex flex-wrap gap-1">
                          {service.features.map((feature, index) => (
                            <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                </div>
              )}
            </div>
          </main>
      </div>
    </ModernLayout>
  );
}
