import React from 'react';
import { PieChart as PieChartIcon } from 'lucide-react';
import { TeamHistory } from '../../types';

interface WinLossDistributionProps {
  teams: TeamHistory[];
}

const WinLossDistribution: React.FC<WinLossDistributionProps> = ({ teams }) => {
  const winLossData = teams.map(team => ({
    name: team.team,
    wins: team.wins,
    losses: team.losses,
    winRate: (team.wins / (team.wins + team.losses)) * 100
  }));

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <PieChartIcon className="w-5 h-5 mr-2 text-purple-400" />
          Win-Loss Distribution
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {winLossData.map((team, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded">
              <div>
                <div className="text-white font-medium">{team.name}</div>
                <div className="text-gray-400 text-sm">
                  {team.wins}W - {team.losses}L
                </div>
              </div>
              <div className="text-right">
                <div className="text-blue-400 font-bold">{team.winRate.toFixed(1)}%</div>
                <div className="text-gray-400 text-sm">win rate</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WinLossDistribution; 