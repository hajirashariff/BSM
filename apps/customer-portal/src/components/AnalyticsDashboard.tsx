import React, { useState } from 'react';

interface Metric {
  id: string;
  title: string;
  value: number;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  trend: number[];
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    fill?: boolean;
  }[];
}

interface AnalyticsDashboardProps {
  metrics: Metric[];
  chartData: ChartData;
  timeRange: '7d' | '30d' | '90d' | '1y';
  onTimeRangeChange: (range: string) => void;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  metrics,
  chartData,
  timeRange,
  onTimeRangeChange
}) => {
  const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);

  const getChangeColor = (changeType: string) => {
    return changeType === 'increase' ? '#10b981' : '#ef4444';
  };

  const getChangeIcon = (changeType: string) => {
    return changeType === 'increase' ? '↗' : '↘';
  };

  // Simple chart rendering (in a real app, you'd use Chart.js or similar)
  const renderSimpleChart = (data: number[], color: string) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return (
      <div style={{ height: '60px', display: 'flex', alignItems: 'end', gap: '2px' }}>
        {data.map((value, index) => {
          const height = ((value - min) / range) * 50 + 10;
          return (
            <div
              key={index}
              style={{
                width: '8px',
                height: `${height}px`,
                backgroundColor: color,
                borderRadius: '2px',
                opacity: 0.7
              }}
            />
          );
        })}
      </div>
    );
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', margin: 0 }}>
            Analytics Dashboard
          </h2>
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '14px',
              backgroundColor: '#ffffff'
            }}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>
        <p style={{ color: '#6b7280', fontSize: '16px', margin: 0 }}>
          Comprehensive analytics from multiple sources including ServiceNow and Jira
        </p>
      </div>

      {/* Key Metrics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginBottom: '32px' 
      }}>
        {metrics.map((metric) => (
          <div
            key={metric.id}
            onClick={() => setSelectedMetric(metric)}
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '20px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: metric.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: metric.color
              }}>
                {metric.icon}
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#111827',
                  marginBottom: '4px'
                }}>
                  {metric.value.toLocaleString()}
                </div>
                <div style={{ 
                  fontSize: '12px', 
                  color: getChangeColor(metric.changeType),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: '4px'
                }}>
                  <span>{getChangeIcon(metric.changeType)}</span>
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
            </div>

            <h3 style={{ 
              fontSize: '14px', 
              fontWeight: '600', 
              color: '#374151',
              marginBottom: '8px'
            }}>
              {metric.title}
            </h3>

            <p style={{ 
              fontSize: '12px', 
              color: '#6b7280',
              marginBottom: '12px',
              lineHeight: '1.4'
            }}>
              {metric.description}
            </p>

            {/* Mini trend chart */}
            <div style={{ marginBottom: '8px' }}>
              {renderSimpleChart(metric.trend, metric.color)}
            </div>

            <div style={{ 
              fontSize: '11px', 
              color: '#9ca3af',
              textAlign: 'center'
            }}>
              Click for details
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
        gap: '24px',
        marginBottom: '32px'
      }}>
        {/* Ticket Volume Chart */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
            Ticket Volume Trend
          </h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'end', gap: '4px' }}>
            {chartData.datasets[0].data.map((value, index) => {
              const max = Math.max(...chartData.datasets[0].data);
              const height = (value / max) * 180 + 20;
              return (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${height}px`,
                      backgroundColor: chartData.datasets[0].backgroundColor,
                      borderRadius: '4px 4px 0 0',
                      marginBottom: '8px'
                    }}
                  />
                  <span style={{ fontSize: '10px', color: '#6b7280' }}>
                    {chartData.labels[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resolution Time Chart */}
        <div style={{
          background: '#ffffff',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
            Average Resolution Time
          </h3>
          <div style={{ height: '200px', display: 'flex', alignItems: 'end', gap: '4px' }}>
            {chartData.datasets[1].data.map((value, index) => {
              const max = Math.max(...chartData.datasets[1].data);
              const height = (value / max) * 180 + 20;
              return (
                <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '100%',
                      height: `${height}px`,
                      backgroundColor: chartData.datasets[1].backgroundColor,
                      borderRadius: '4px 4px 0 0',
                      marginBottom: '8px'
                    }}
                  />
                  <span style={{ fontSize: '10px', color: '#6b7280' }}>
                    {chartData.labels[index]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Data Sources */}
      <div style={{
        background: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '16px' }}>
          Data Sources
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {[
            { name: 'ServiceNow', status: 'Connected', color: '#10b981' },
            { name: 'Jira', status: 'Connected', color: '#10b981' },
            { name: 'Slack', status: 'Connected', color: '#10b981' },
            { name: 'Email', status: 'Syncing', color: '#f59e0b' }
          ].map((source) => (
            <div key={source.name} style={{
              padding: '16px',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: source.color
              }} />
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                  {source.name}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {source.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metric Detail Modal */}
      {selectedMetric && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
          onClick={() => setSelectedMetric(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '500px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
              {selectedMetric.title} - Detailed View
            </h3>
            
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>Current Value</span>
                <span style={{ fontSize: '24px', fontWeight: '700', color: '#111827' }}>
                  {selectedMetric.value.toLocaleString()}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>Change</span>
                <span style={{ 
                  fontSize: '16px', 
                  fontWeight: '600', 
                  color: getChangeColor(selectedMetric.changeType)
                }}>
                  {getChangeIcon(selectedMetric.changeType)} {Math.abs(selectedMetric.change)}%
                </span>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Trend</h4>
              <div style={{ height: '100px' }}>
                {renderSimpleChart(selectedMetric.trend, selectedMetric.color)}
              </div>
            </div>

            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '1.5' }}>
              {selectedMetric.description}
            </p>

            <button
              onClick={() => setSelectedMetric(null)}
              style={{
                marginTop: '20px',
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsDashboard;
