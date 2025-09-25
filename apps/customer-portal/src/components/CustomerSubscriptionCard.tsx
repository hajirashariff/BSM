import React, { useState } from 'react';
import { 
  CreditCard, 
  Calendar, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle, 
  Pause, 
  Play, 
  Settings, 
  TrendingUp, 
  TrendingDown,
  MoreVertical,
  X
} from 'lucide-react';
import { CustomerSubscription } from '../lib/customerBillingService';

interface CustomerSubscriptionCardProps {
  subscription: CustomerSubscription;
  onCancel?: (id: string) => Promise<void>;
  onPause?: (id: string) => Promise<void>;
  onResume?: (id: string) => Promise<void>;
  onUpgrade?: (id: string) => Promise<void>;
  onDowngrade?: (id: string) => Promise<void>;
}

const statusColors = {
  active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  inactive: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
  suspended: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  cancelled: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  expired: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
};

const statusIcons = {
  active: CheckCircle,
  inactive: X,
  suspended: Pause,
  cancelled: X,
  expired: AlertTriangle
};

export default function CustomerSubscriptionCard({ 
  subscription, 
  onCancel, 
  onPause, 
  onResume, 
  onUpgrade, 
  onDowngrade 
}: CustomerSubscriptionCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showActions, setShowActions] = useState(false);

  const StatusIcon = statusIcons[subscription.status];

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getBillingCycleText = (cycle: string) => {
    switch (cycle) {
      case 'monthly': return 'per month';
      case 'quarterly': return 'per quarter';
      case 'yearly': return 'per year';
      default: return cycle;
    }
  };

  const handleAction = async (action: () => Promise<void>) => {
    setIsLoading(true);
    try {
      await action();
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setIsLoading(false);
      setShowActions(false);
    }
  };

  const getNextBillingText = () => {
    if (subscription.status === 'cancelled' || subscription.status === 'expired') {
      return 'No future billing';
    }
    if (subscription.status === 'suspended') {
      return 'Billing paused';
    }
    return `Next billing: ${formatDate(subscription.nextBillingDate)}`;
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-gray-200 dark:border-zinc-800 p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-zinc-100">
              {subscription.name}
            </h3>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[subscription.status]}`}>
              {subscription.status.toUpperCase()}
            </span>
            <StatusIcon size={16} className="text-gray-400" />
          </div>
          
          <p className="text-gray-600 dark:text-zinc-400 mb-4">
            {subscription.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <DollarSign size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Price</p>
                <p className="font-semibold text-gray-900 dark:text-zinc-100">
                  {formatCurrency(subscription.price, subscription.currency)} {getBillingCycleText(subscription.billingCycle)}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Billing Cycle</p>
                <p className="font-semibold text-gray-900 dark:text-zinc-100 capitalize">
                  {subscription.billingCycle}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <CreditCard size={16} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-600 dark:text-zinc-400">Auto Renew</p>
                <p className="font-semibold text-gray-900 dark:text-zinc-100">
                  {subscription.autoRenew ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">Features included:</p>
            <div className="flex flex-wrap gap-2">
              {subscription.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div className="text-sm text-gray-600 dark:text-zinc-400">
            <p>Started: {formatDate(subscription.startDate)}</p>
            {subscription.endDate && (
              <p>Ends: {formatDate(subscription.endDate)}</p>
            )}
            <p className={subscription.status === 'active' ? 'text-green-600 dark:text-green-400' : ''}>
              {getNextBillingText()}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
          >
            <MoreVertical size={20} />
          </button>

          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-800 rounded-lg shadow-lg border border-gray-200 dark:border-zinc-700 z-10">
              <div className="py-1">
                {subscription.status === 'active' && subscription.canPause && (
                  <button
                    onClick={() => handleAction(() => onPause?.(subscription.id))}
                    disabled={isLoading}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <Pause size={16} />
                    <span>Pause Subscription</span>
                  </button>
                )}

                {subscription.status === 'suspended' && (
                  <button
                    onClick={() => handleAction(() => onResume?.(subscription.id))}
                    disabled={isLoading}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <Play size={16} />
                    <span>Resume Subscription</span>
                  </button>
                )}

                {subscription.canUpgrade && (
                  <button
                    onClick={() => handleAction(() => onUpgrade?.(subscription.id))}
                    disabled={isLoading}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <TrendingUp size={16} />
                    <span>Upgrade Plan</span>
                  </button>
                )}

                {subscription.canDowngrade && (
                  <button
                    onClick={() => handleAction(() => onDowngrade?.(subscription.id))}
                    disabled={isLoading}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                  >
                    <TrendingDown size={16} />
                    <span>Downgrade Plan</span>
                  </button>
                )}

                {subscription.canCancel && subscription.status !== 'cancelled' && (
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to cancel this subscription?')) {
                        handleAction(() => onCancel?.(subscription.id));
                      }
                    }}
                    disabled={isLoading}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <X size={16} />
                    <span>Cancel Subscription</span>
                  </button>
                )}

                <button
                  onClick={() => setShowActions(false)}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700 dark:text-zinc-300 hover:bg-gray-100 dark:hover:bg-zinc-700"
                >
                  <Settings size={16} />
                  <span>Manage Settings</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="mt-4 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  );
}

