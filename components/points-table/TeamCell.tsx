import React from 'react';
import { PointsTableEntry } from '../../types';

interface TeamCellProps {
  team: PointsTableEntry;
}

const TeamCell: React.FC<TeamCellProps> = ({ team }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-sm">{team.team.shortName}</span>
      </div>
      <div className="flex-1">
        <div className="text-white font-medium">{team.team.name}</div>
        <div className="text-gray-400 text-sm">{team.team.shortName}</div>
      </div>
    </div>
  );
};

export default TeamCell; 