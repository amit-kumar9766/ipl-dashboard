import React from 'react';

interface TeamScoreProps {
  team: { name: string; shortName: string };
  score?: string;
  teamColor: string;
  shortNameColor: string;
}

const TeamScore: React.FC<TeamScoreProps> = ({ team, score, teamColor, shortNameColor }) => {
  const hasScore = score && score !== 'N/A';
  
  return (
    <div className="bg-black/20 rounded-xl p-6 border border-red-500/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 bg-gradient-to-br ${teamColor} rounded-full flex items-center justify-center`}>
            <span className="text-white font-bold text-lg">{team.shortName}</span>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{team.name}</h3>
            <p className={`text-sm ${shortNameColor}`}>{team.shortName}</p>
          </div>
        </div>
        {hasScore && (
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{score}</div>
            <div className="text-sm text-gray-400">Current Score</div>
          </div>
        )}
      </div>
      {!hasScore && (
        <div className="text-center py-4">
          <div className="text-gray-400 text-sm">Yet to bat</div>
        </div>
      )}
    </div>
  );
};

export default TeamScore; 