import React from 'react';
import { BarChart3 } from 'lucide-react';
import { PlayerStats } from '../../types';

interface PlayerStatsTableProps {
  players: PlayerStats[];
}

const PlayerStatsTable: React.FC<PlayerStatsTableProps> = ({ players }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
          Player Statistics
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-white font-semibold">Player</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Team</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Matches</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Runs</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Wickets</th>
              <th className="px-4 py-3 text-left text-white font-semibold">SR</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Form</th>
            </tr>
          </thead>
          <tbody>
            {players.slice(0, 10).map((player, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="px-4 py-3 text-white font-medium">{player.name}</td>
                <td className="px-4 py-3 text-gray-300">{player.team}</td>
                <td className="px-4 py-3 text-gray-300">{player.matches}</td>
                <td className="px-4 py-3 text-green-400 font-semibold">{player.runs}</td>
                <td className="px-4 py-3 text-red-400 font-semibold">{player.wickets}</td>
                <td className="px-4 py-3 text-gray-300">{player.strikeRate}</td>
                <td className="px-4 py-3">
                  <div className="flex space-x-1">
                    {player.form.slice(-3).map((result, i) => (
                      <span
                        key={i}
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          result === 'W' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                        }`}
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlayerStatsTable; 