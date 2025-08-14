import React from 'react';
import StatusIcon from './StatusIcon';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500/20 border-red-500/30 text-red-400';
      case 'completed':
        return 'bg-green-500/20 border-green-500/30 text-green-400';
      case 'upcoming':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-400';
      default:
        return 'bg-gray-500/20 border-gray-500/30 text-gray-400';
    }
  };

  return (
    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(status)}`}>
      <div className="flex items-center gap-1">
        <StatusIcon status={status} />
        <span className="capitalize">{status}</span>
      </div>
    </div>
  );
};

export default StatusBadge; 