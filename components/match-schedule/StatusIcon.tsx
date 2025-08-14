import React from 'react';
import { Play, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

interface StatusIconProps {
  status: string;
}

const StatusIcon: React.FC<StatusIconProps> = ({ status }) => {
  switch (status) {
    case 'live':
      return <Play className="w-4 h-4 text-red-400" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-400" />;
    case 'upcoming':
      return <AlertCircle className="w-4 h-4 text-blue-400" />;
    default:
      return <Calendar className="w-4 h-4 text-gray-400" />;
  }
};

export default StatusIcon; 