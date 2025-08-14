import React from 'react';
import { PointsTableEntry } from '../../types';
import PositionIcon from './PositionIcon';
import TeamCell from './TeamCell';

interface TableRowProps {
  team: PointsTableEntry;
}

const TableRow: React.FC<TableRowProps> = ({ team }) => {
  return (
    <tr className="border-b border-gray-700/30 hover:bg-gray-800/20 transition-colors">
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <PositionIcon position={team.position} />
        </div>
      </td>
      <td className="py-4 px-4">
        <TeamCell team={team} />
      </td>
      <td className="text-center py-4 px-4">
        <span className="text-white font-semibold">{team.points}</span>
      </td>
      <td className="text-center py-4 px-4">
        <span className="text-green-400 font-medium">{team.won}</span>
      </td>
      <td className="text-center py-4 px-4">
        <span className="text-red-400 font-medium">{team.lost}</span>
      </td>
      <td className="text-center py-4 px-4">
        <span className="text-gray-400">{team.tied}</span>
      </td>
      <td className="text-center py-4 px-4">
        <span className="text-gray-400">{team.noResult}</span>
      </td>
      <td className="text-center py-4 px-4">
        <span className={`font-mono ${team.netRunRate >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {team.netRunRate.toFixed(3)}
        </span>
      </td>
    </tr>
  );
};

export default TableRow; 