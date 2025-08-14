import React from 'react';
import { Calendar, Trophy, BarChart3 } from 'lucide-react';

const HistoricalHeader: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Historical Data & Analytics</h2>
          <p className="text-gray-300">Comprehensive insights into IPL performance and statistics</p>
        </div>
        <div className="flex space-x-2">
          <Calendar className="w-8 h-8 text-blue-300" />
          <Trophy className="w-8 h-8 text-yellow-400" />
          <BarChart3 className="w-8 h-8 text-green-400" />
        </div>
      </div>
    </div>
  );
};

export default HistoricalHeader; 