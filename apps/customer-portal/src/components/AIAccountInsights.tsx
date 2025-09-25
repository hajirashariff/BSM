import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  Zap,
  Loader2,
  RefreshCw,
  BarChart3,
  DollarSign,
  Users,
  Clock
} from 'lucide-react';
import aiService, { AIAccountAnalysis } from '../lib/aiService';

interface AIAccountInsightsProps {
  accountData: any;
  onInsightAction?: (action: string, data: any) => void;
}

const AIAccountInsights: React.FC<AIAccountInsightsProps> = ({ 
  accountData, 
  onInsightAction 
}) => {
  const [analysis, setAnalysis] = useState<AIAccountAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastAnalyzed, setLastAnalyzed] = useState<Date | null>(null);

  const analyzeAccount = async () => {
    setIsAnalyzing(true);
    setError(null);

    try {
      const result = await aiService.analyzeAccount(accountData);
      setAnalysis(result);
      setLastAnalyzed(new Date());
    } catch (err) {
      console.error('Account analysis error:', err);
      setError('Failed to analyze account. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (accountData) {
      analyzeAccount();
    }
  }, [accountData]);

  const getChurnRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHealthTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="text-green-600" size={16} />;
      case 'down': return <TrendingDown className="text-red-600" size={16} />;
      default: return <BarChart3 className="text-gray-600" size={16} />;
    }
  };

  const getHealthTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleActionClick = (action: string) => {
    if (onInsightAction) {
      onInsightAction(action, { accountData, analysis });
    }
  };

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-center space-x-3">
          <Loader2 className="animate-spin text-purple-600" size={24} />
          <span className="text-gray-600">Analyzing account with AI...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <AlertTriangle className="text-red-600" size={20} />
          <h3 className="text-lg font-semibold text-red-900">Analysis Error</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={analyzeAccount}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          <RefreshCw size={16} />
          <span>Retry Analysis</span>
        </button>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Brain className="text-purple-600" size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">AI-Powered Account Insights</h3>
            <p className="text-sm text-gray-600">
              {lastAnalyzed && `Last analyzed: ${lastAnalyzed.toLocaleTimeString()}`}
            </p>
          </div>
        </div>
        <button
          onClick={analyzeAccount}
          className="flex items-center space-x-2 px-3 py-2 text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <RefreshCw size={16} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Churn Risk</span>
            <AlertTriangle className="text-gray-400" size={16} />
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getChurnRiskColor(analysis.churn_risk)}`}>
              {analysis.churn_risk}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(analysis.confidence * 100)}% confidence
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Health Trend</span>
            {getHealthTrendIcon(analysis.health_trend)}
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-semibold ${getHealthTrendColor(analysis.health_trend)}`}>
              {analysis.health_trend.charAt(0).toUpperCase() + analysis.health_trend.slice(1)}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Upsell Opportunity</span>
            <Target className="text-gray-400" size={16} />
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
              analysis.upsell_opportunity.has_opportunity 
                ? 'text-green-600 bg-green-100' 
                : 'text-gray-600 bg-gray-100'
            }`}>
              {analysis.upsell_opportunity.has_opportunity ? 'Yes' : 'No'}
            </span>
            {analysis.upsell_opportunity.has_opportunity && (
              <span className="text-xs text-gray-500">
                {analysis.upsell_opportunity.estimated_value}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Insights */}
      {analysis.insights.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Zap className="text-yellow-600" size={20} />
            <h4 className="text-lg font-semibold text-gray-900">Key Insights</h4>
          </div>
          <div className="space-y-3">
            {analysis.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <CheckCircle className="text-green-600 mt-1" size={16} />
                <p className="text-sm text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Actions */}
      {analysis.recommended_actions.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="text-blue-600" size={20} />
            <h4 className="text-lg font-semibold text-gray-900">Recommended Actions</h4>
          </div>
          <div className="space-y-3">
            {analysis.recommended_actions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">{action}</p>
                <button
                  onClick={() => handleActionClick(action)}
                  className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Take Action
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upsell Opportunities */}
      {analysis.upsell_opportunity.has_opportunity && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-6">
          <div className="flex items-center space-x-2 mb-4">
            <DollarSign className="text-green-600" size={20} />
            <h4 className="text-lg font-semibold text-green-900">Upsell Opportunities</h4>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Estimated Value:</span>
              <span className="text-lg font-semibold text-green-900">
                {analysis.upsell_opportunity.estimated_value}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-green-700 mb-2">Suggested Products:</p>
              <div className="flex flex-wrap gap-2">
                {analysis.upsell_opportunity.suggested_products.map((product, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-700">Confidence:</span>
              <span className="text-sm font-semibold text-green-900">
                {Math.round(analysis.upsell_opportunity.confidence * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart3 className="text-gray-600" size={16} />
          <span className="text-sm font-medium text-gray-700">Analysis Summary</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Confidence:</span>
            <span className="ml-1 font-semibold">{Math.round(analysis.confidence * 100)}%</span>
          </div>
          <div>
            <span className="text-gray-500">Risk Level:</span>
            <span className={`ml-1 font-semibold ${getChurnRiskColor(analysis.churn_risk).split(' ')[0]}`}>
              {analysis.churn_risk}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Trend:</span>
            <span className={`ml-1 font-semibold ${getHealthTrendColor(analysis.health_trend)}`}>
              {analysis.health_trend}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Actions:</span>
            <span className="ml-1 font-semibold">{analysis.recommended_actions.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAccountInsights;

