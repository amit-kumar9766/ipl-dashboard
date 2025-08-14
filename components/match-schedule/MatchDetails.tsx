import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Match } from '../../types';
import TeamDisplay from './TeamDisplay';

interface MatchDetailsProps {
  match: Match;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ match }) => (
  <div className="p-4 bg-gray-900/30 rounded-lg border border-gray-700/30 mt-2">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="flex items-center justify-between">
        <TeamDisplay team={match.team1} bgColor="from-blue-600 to-blue-800" />
        <div className="text-center">
          <div className="text-gray-400 text-sm font-medium">VS</div>
        </div>
        <TeamDisplay team={match.team2} bgColor="from-green-600 to-green-800" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-400">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{match.venue}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{match.time}</span>
        </div>
        {match.matchNumber && (
          <div className="text-gray-400 text-sm">Match {match.matchNumber}</div>
        )}
      </div>

      <div className="text-center">
        {match.result && (
          <div className="text-white font-semibold mb-1">{match.result}</div>
        )}
        {match.score1 && match.score2 && (
          <div className="text-gray-300 text-sm">
            {match.team1.shortName}: {match.score1} | {match.team2.shortName}: {match.score2}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default MatchDetails; 