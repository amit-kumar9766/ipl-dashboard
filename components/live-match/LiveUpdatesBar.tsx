import React from 'react';
import { Zap } from 'lucide-react';
import { Match } from '../../types';

interface LiveUpdatesBarProps {
  match: Match;
  hasScores: boolean;
}

const LiveUpdatesBar: React.FC<LiveUpdatesBarProps> = ({ match, hasScores }) => (
  <div className="mt-6 bg-black/30 rounded-lg p-4 border border-red-500/20">
    <div className="flex items-center gap-3">
      <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
      <div className="flex-1">
        <div className="text-yellow-400 text-sm font-medium mb-1">Live Updates</div>
        <div className="text-gray-300 text-sm">
          {hasScores 
            ? `Live score: ${match.team1.shortName} ${match.score1} vs ${match.team2.shortName} ${match.score2}`
            : 'Match in progress - waiting for live scores'
          }
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-green-400 text-sm">Connected</span>
      </div>
    </div>
  </div>
);

export default LiveUpdatesBar; 