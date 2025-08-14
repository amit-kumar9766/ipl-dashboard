import React from 'react';

interface TeamDisplayProps {
  team: { name: string; shortName: string };
  bgColor: string;
}

const TeamDisplay: React.FC<TeamDisplayProps> = ({ team, bgColor }) => (
  <div className="text-center">
    <div className={`w-10 h-10 bg-gradient-to-br ${bgColor} rounded-full flex items-center justify-center mb-1`}>
      <span className="text-white font-bold text-sm">{team.shortName}</span>
    </div>
    <div className="text-white font-semibold text-sm">{team.name}</div>
  </div>
);

export default TeamDisplay; 