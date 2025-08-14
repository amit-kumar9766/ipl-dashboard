import React from 'react';
import { Target } from 'lucide-react';
import { PlayerStats } from '../../types';

interface TopBowlersChartProps {
  players: PlayerStats[];
}

const TopBowlersChart: React.FC<TopBowlersChartProps> = ({ players }) => {
  const topBowlers = players
    .sort((a, b) => b.wickets - a.wickets)
    .slice(0, 10);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Target className="w-5 h-5 mr-2 text-red-400" />
          Top Bowlers
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {topBowlers.map((player, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded">
              <div>
                <div className="text-white font-medium">{player.name}</div>
                <div className="text-gray-400 text-sm">{player.team}</div>
              </div>
              <div className="text-right">
                <div className="text-red-400 font-bold">{player.wickets}</div>
                <div className="text-gray-400 text-sm">wickets</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBowlersChart; 