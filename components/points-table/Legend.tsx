import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const Legend: React.FC = () => (
  <div className="mt-6 p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
    <h3 className="text-white font-medium mb-3">Legend</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
      <div className="flex items-center gap-2">
        <Trophy className="w-4 h-4 text-yellow-400" />
        <span className="text-gray-300">1st Place</span>
      </div>
      <div className="flex items-center gap-2">
        <Medal className="w-4 h-4 text-gray-400" />
        <span className="text-gray-300">2nd Place</span>
      </div>
      <div className="flex items-center gap-2">
        <Award className="w-4 h-4 text-amber-600" />
        <span className="text-gray-300">3rd Place</span>
      </div>
    </div>
  </div>
);

export default Legend; 