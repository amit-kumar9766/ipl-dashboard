import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Match } from '../../types';
import StatusBadge from './StatusBadge';

interface MatchHeaderProps {
  match: Match;
  expandedMatch: string | null;
  onToggleExpanded: (matchId: string) => void;
}

const MatchHeader: React.FC<MatchHeaderProps> = ({ match, expandedMatch, onToggleExpanded }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isExpanded = expandedMatch === match.id;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
      <div className="flex items-center gap-4">
        <StatusBadge status={match.status} />
        <div>
          <div className="text-white font-semibold">{match.team1.name} vs {match.team2.name}</div>
          <div className="text-gray-400 text-sm">{formatDate(match.date)} • {match.time}</div>
        </div>
      </div>
      <button
        onClick={() => onToggleExpanded(match.id)}
        className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
      >
        {isExpanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </button>
    </div>
  );
};

export default MatchHeader; 