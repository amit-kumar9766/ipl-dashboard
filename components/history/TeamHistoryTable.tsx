import React from 'react';
import { Trophy } from 'lucide-react';
import { TeamHistory } from '../../types';

interface TeamHistoryTableProps {
  teams: TeamHistory[];
}

const TeamHistoryTable: React.FC<TeamHistoryTableProps> = ({ teams }) => {
  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
          Team History
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-white font-semibold">Team</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Season</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Wins</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Losses</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Points</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Position</th>
              <th className="px-4 py-3 text-left text-white font-semibold">Playoffs</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                <td className="px-4 py-3 text-white font-medium">{team.team}</td>
                <td className="px-4 py-3 text-gray-300">{team.season}</td>
                <td className="px-4 py-3 text-green-400 font-semibold">{team.wins}</td>
                <td className="px-4 py-3 text-red-400 font-semibold">{team.losses}</td>
                <td className="px-4 py-3 text-blue-400 font-semibold">{team.points}</td>
                <td className="px-4 py-3 text-gray-300">{team.position}</td>
                <td className="px-4 py-3">
                  {team.playoffs ? (
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">Yes</span>
                  ) : (
                    <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">No</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamHistoryTable; 