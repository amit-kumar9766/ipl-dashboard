import React from 'react';
import { BarChart3 } from 'lucide-react';

const EmptyState: React.FC = () => (
  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-8 border border-gray-700/50">
    <div className="text-center">
      <div className="bg-gray-700/50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <BarChart3 className="w-8 h-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">Points Table Unavailable</h2>
      <p className="text-gray-400">Unable to load current standings</p>
    </div>
  </div>
);

export default EmptyState; 