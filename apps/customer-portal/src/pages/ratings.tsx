import React, { useState } from 'react';
import Head from 'next/head';
import ModernLayout from '../components/ModernLayout';
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Clock,
  User,
  Filter,
  Search,
  SortAsc,
  Eye,
  Calendar,
  X
} from 'lucide-react';

interface Rating {
  id: string;
  ticketId: string;
  ticketSubject: string;
  rating: number;
  satisfaction: 'very_satisfied' | 'satisfied' | 'neutral' | 'dissatisfied' | 'very_dissatisfied';
  responseTime: number;
  resolutionQuality: number;
  communication: number;
  overallExperience: number;
  category: string;
  feedback: string;
  agentName: string;
  createdAt: string;
  status: 'completed' | 'pending';
}

const mockRatings: Rating[] = [
  {
    id: 'R001',
    ticketId: 'T-12345',
    ticketSubject: 'Login issues with mobile app',
    rating: 5,
    satisfaction: 'very_satisfied',
    responseTime: 5,
    resolutionQuality: 5,
    communication: 4,
    overallExperience: 5,
    category: 'Technical Support',
    feedback: 'Excellent support! The agent was very helpful and resolved my issue quickly.',
    agentName: 'Sarah Johnson',
    createdAt: '2024-01-15T10:30:00Z',
    status: 'completed'
  },
  {
    id: 'R002',
    ticketId: 'T-12346',
    ticketSubject: 'Billing inquiry',
    rating: 4,
    satisfaction: 'satisfied',
    responseTime: 4,
    resolutionQuality: 4,
    communication: 5,
    overallExperience: 4,
    category: 'Billing',
    feedback: 'Good service, but took a bit longer than expected.',
    agentName: 'Mike Chen',
    createdAt: '2024-01-14T14:20:00Z',
    status: 'completed'
  },
  {
    id: 'R003',
    ticketId: 'T-12347',
    ticketSubject: 'Feature request',
    rating: 3,
    satisfaction: 'neutral',
    responseTime: 3,
    resolutionQuality: 3,
    communication: 3,
    overallExperience: 3,
    category: 'Feature Request',
    feedback: 'Average experience. The request was noted but no timeline provided.',
    agentName: 'Alex Rodriguez',
    createdAt: '2024-01-13T09:15:00Z',
    status: 'completed'
  }
];

const satisfactionLabels = {
  very_satisfied: 'Very Satisfied',
  satisfied: 'Satisfied',
  neutral: 'Neutral',
  dissatisfied: 'Dissatisfied',
  very_dissatisfied: 'Very Dissatisfied'
};

const satisfactionColors = {
  very_satisfied: 'text-green-600 bg-green-100',
  satisfied: 'text-green-500 bg-green-50',
  neutral: 'text-yellow-600 bg-yellow-100',
  dissatisfied: 'text-orange-600 bg-orange-100',
  very_dissatisfied: 'text-red-600 bg-red-100'
};

export default function RatingsPage() {
  const [ratings, setRatings] = useState<Rating[]>(mockRatings);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);

  const filteredRatings = ratings.filter(rating => {
    const matchesSearch = rating.ticketSubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         rating.agentName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || rating.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedRatings = [...filteredRatings].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'oldest':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / ratings.length;
  const totalRatings = ratings.length;
  const completedRatings = ratings.filter(r => r.status === 'completed').length;

  const RatingCard = ({ rating }: { rating: Rating }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
         onClick={() => setSelectedRating(rating)}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {rating.ticketSubject}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{rating.agentName}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(rating.createdAt).toLocaleDateString()}</span>
            </span>
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {rating.category}
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < rating.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {rating.rating}/5
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{rating.responseTime}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Response Time</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{rating.resolutionQuality}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Resolution Quality</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{rating.communication}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Communication</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{rating.overallExperience}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Overall Experience</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          satisfactionColors[rating.satisfaction]
        }`}>
          {satisfactionLabels[rating.satisfaction]}
        </span>
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <Eye className="w-4 h-4" />
          <span className="text-sm">View Details</span>
        </div>
      </div>
    </div>
  );

  return (
    <ModernLayout>
      <Head>
        <title>Ticket Ratings - BSM Portal</title>
        <meta name="description" content="View and manage your ticket ratings" />
      </Head>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Ticket Ratings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and analyze your ticket ratings and feedback
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {averageRating.toFixed(1)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Ratings</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalRatings}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">{completedRatings}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <ThumbsUp className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search ratings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>
            <div className="flex space-x-4">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                <option value="Technical Support">Technical Support</option>
                <option value="Billing">Billing</option>
                <option value="Feature Request">Feature Request</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-700 dark:text-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Ratings Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sortedRatings.map((rating) => (
            <RatingCard key={rating.id} rating={rating} />
          ))}
        </div>

        {sortedRatings.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No ratings found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>

      {/* Rating Detail Modal */}
      {selectedRating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Rating Details
                </h2>
                <button
                  onClick={() => setSelectedRating(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {selectedRating.ticketSubject}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Ticket: {selectedRating.ticketId}</span>
                    <span>Agent: {selectedRating.agentName}</span>
                    <span>Category: {selectedRating.category}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedRating.responseTime}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Response Time</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedRating.resolutionQuality}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Resolution Quality</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedRating.communication}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Communication</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedRating.overallExperience}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Overall Experience</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Feedback
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-700 p-4 rounded-lg">
                    {selectedRating.feedback}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      satisfactionColors[selectedRating.satisfaction]
                    }`}>
                      {satisfactionLabels[selectedRating.satisfaction]}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < selectedRating.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(selectedRating.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModernLayout>
  );
}
