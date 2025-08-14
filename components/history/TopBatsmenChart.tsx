import React from 'react';
import { Users } from 'lucide-react';
import { PlayerStats } from '../../types';

interface TopBatsmenChartProps {
  players: PlayerStats[];
}

const TopBatsmenChart: React.FC<TopBatsmenChartProps> = ({ players }) => {
  const topBatsmen = players
    .sort((a, b) => b.runs - a.runs)
    .slice(0, 10);

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Users className="w-5 h-5 mr-2 text-green-400" />
          Top Batsmen
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {topBatsmen.map((player, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded">
              <div>
                <div className="text-white font-medium">{player.name}</div>
                <div className="text-gray-400 text-sm">{player.team}</div>
              </div>
              <div className="text-right">
                <div className="text-green-400 font-bold">{player.runs}</div>
                <div className="text-gray-400 text-sm">runs</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopBatsmenChart; 