import React from 'react';
import { Button } from '../ui';

interface StatusBarProps {
  dataSource: string;
  cacheStatus: string;
  lastUpdated?: string;
  autoRefresh: boolean;
  loading: boolean;
  onToggleAutoRefresh: () => void;
  onManualRefresh: () => void;
}

const getStatusColor = (status: string) => {
  if (status === 'hit') return 'bg-green-400';
  if (status === 'miss') return 'bg-blue-400';
  return 'bg-yellow-400';
};

const formatTime = (timestamp?: string) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
};

const DataSource: React.FC<{ dataSource: string }> = ({ dataSource }) => (
  <div className="flex items-center space-x-2">
    <span className="text-gray-300">
      Source: {dataSource.replace('_', ' ')}
    </span>
  </div>
);

const CacheStatus: React.FC<{ cacheStatus: string }> = ({ cacheStatus }) => (
  <div className="flex items-center space-x-2">
    <div className={`w-2 h-2 rounded-full ${getStatusColor(cacheStatus)}`} />
    <span className="text-gray-300">Cache: {cacheStatus}</span>
  </div>
);

const LastUpdated: React.FC<{ lastUpdated?: string }> = ({ lastUpdated }) => (
  lastUpdated && (
    <span className="text-gray-400">
      Updated: {formatTime(lastUpdated)}
    </span>
  )
);

interface StatusControlsProps {
  autoRefresh: boolean;
  loading: boolean;
  onToggleAutoRefresh: () => void;
  onManualRefresh: () => void;
}

const StatusControls: React.FC<StatusControlsProps> = ({
  autoRefresh,
  loading,
  onToggleAutoRefresh,
  onManualRefresh
}) => (
  <div className="flex items-center space-x-2">
    <Button
      variant="ghost"
      size="sm"
      onClick={onToggleAutoRefresh}
      className={autoRefresh ? 'text-green-400' : 'text-gray-400'}
    >
      Auto-refresh
    </Button>
    
    <Button
      variant="outline"
      size="sm"
      onClick={onManualRefresh}
      loading={loading}
    >
      Refresh
    </Button>
  </div>
);

const StatusBar: React.FC<StatusBarProps> = ({
  dataSource,
  cacheStatus,
  lastUpdated,
  autoRefresh,
  loading,
  onToggleAutoRefresh,
  onManualRefresh
}) => {
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <DataSource dataSource={dataSource} />
          <CacheStatus cacheStatus={cacheStatus} />
          <LastUpdated lastUpdated={lastUpdated} />
        </div>
        
        <StatusControls
          autoRefresh={autoRefresh}
          loading={loading}
          onToggleAutoRefresh={onToggleAutoRefresh}
          onManualRefresh={onManualRefresh}
        />
      </div>
    </div>
  );
};

export default StatusBar; 