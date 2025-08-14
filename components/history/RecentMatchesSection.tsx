import React from 'react';
import { Calendar, Award } from 'lucide-react';
import { HistoricalMatch } from '../../types';

interface RecentMatchesSectionProps {
  matches: HistoricalMatch[];
}

const RecentMatchesSection: React.FC<RecentMatchesSectionProps> = ({ matches }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-400" />
          Recent Matches
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="text-sm text-gray-400 mb-1">{match.date}</div>
                  <div className="text-lg font-semibold text-white">
                    {match.team1} vs {match.team2}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Venue</div>
                  <div className="text-white">{match.venue}</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="bg-gray-600 rounded p-3">
                  <div className="text-sm text-gray-400">{match.team1}</div>
                  <div className="text-lg font-bold text-white">{match.team1Score}</div>
                </div>
                <div className="bg-gray-600 rounded p-3">
                  <div className="text-sm text-gray-400">{match.team2}</div>
                  <div className="text-lg font-bold text-white">{match.team2Score}</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-green-400 font-semibold">{match.result}</div>
                {match.playerOfTheMatch && (
                  <div className="text-sm text-blue-400">
                    <Award className="w-4 h-4 inline mr-1" />
                    {match.playerOfTheMatch}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentMatchesSection; 