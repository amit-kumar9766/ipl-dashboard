import React from 'react';
import { Play } from 'lucide-react';

const MatchHeader: React.FC = () => (
  <div className="mb-6">
    <div className="flex items-center gap-3 mb-2">
      <div className="bg-red-600 p-2 rounded-lg">
        <Play className="w-5 h-5 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-white">Live Match</h2>
    </div>
    <p className="text-red-300 text-sm">Real-time updates from the field</p>
  </div>
);

export default MatchHeader; 