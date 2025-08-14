import React from 'react';
import { Clock, Trophy } from 'lucide-react';

const NoMatchState: React.FC = () => (
  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-xl p-8 border border-gray-700/50">
    <div className="text-center">
      <div className="bg-gray-700/50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <Trophy className="w-8 h-8 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">No Live Match</h2>
      <p className="text-gray-400 mb-4">Currently no matches are being played</p>
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        <span>Check back later for live updates</span>
      </div>
    </div>
  </div>
);

export default NoMatchState; 