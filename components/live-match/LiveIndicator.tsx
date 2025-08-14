import React from 'react';

const LiveIndicator: React.FC = () => (
  <div className="absolute top-4 right-4 flex items-center gap-2">
    <div className="flex items-center gap-2 bg-red-600/20 px-3 py-1 rounded-full border border-red-500/30">
      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
      <span className="text-red-400 text-sm font-medium">LIVE</span>
    </div>
  </div>
);

export default LiveIndicator; 