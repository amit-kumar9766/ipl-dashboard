import React from 'react';
import { TeamHistory, PerformanceMetrics } from '../../types';

interface TeamPerformanceChartProps {
  teams?: TeamHistory[];
  performanceMetrics: PerformanceMetrics[];
}

interface WinLossRecordItemProps {
  team: {
    name: string;
    wins: number;
    losses: number;
    winRate: number;
  };
}

const WinLossRecordItem: React.FC<WinLossRecordItemProps> = ({ team }) => (
  <div className="flex justify-between items-center p-3 bg-gray-700 rounded">
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
);

const WinLossRecordsSection: React.FC<{ teams: TeamHistory[] }> = ({ teams }) => {
  const winLossData = teams.map(team => ({
    name: team.team,
    wins: team.wins,
    losses: team.losses,
    winRate: (team.wins / (team.wins + team.losses)) * 100
  }));

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">Team Win-Loss Records</h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {winLossData.map((team, index) => (
            <WinLossRecordItem key={index} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PerformanceMetricsItemProps {
  team: {
    name: string;
    battingAvg: number;
    bowlingAvg: number;
    runRate: number;
    winPercentage: number;
  };
}

const PerformanceMetricsItem: React.FC<PerformanceMetricsItemProps> = ({ team }) => (
  <div className="p-3 bg-gray-700 rounded">
    <div className="text-white font-medium mb-2">{team.name}</div>
    <div className="grid grid-cols-2 gap-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-400">Batting Avg:</span>
        <span className="text-white">{team.battingAvg}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Bowling Avg:</span>
        <span className="text-white">{team.bowlingAvg}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Run Rate:</span>
        <span className="text-white">{team.runRate}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400">Win %:</span>
        <span className="text-green-400">{team.winPercentage}%</span>
      </div>
    </div>
  </div>
);

const PerformanceMetricsSection: React.FC<{ performanceMetrics: PerformanceMetrics[] }> = ({ performanceMetrics }) => {
  const teamPerformanceData = performanceMetrics.map(team => ({
    name: team.team,
    battingAvg: team.battingAverage,
    bowlingAvg: team.bowlingAverage,
    runRate: team.runRate,
    winPercentage: team.winPercentage
  }));

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-xl font-semibold text-white">Team Performance Metrics</h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {teamPerformanceData.map((team, index) => (
            <PerformanceMetricsItem key={index} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TeamPerformanceChart: React.FC<TeamPerformanceChartProps> = ({ teams, performanceMetrics }) => {
  return (
    <div className="space-y-6">
      {teams && teams.length > 0 && (
        <WinLossRecordsSection teams={teams} />
      )}
      <PerformanceMetricsSection performanceMetrics={performanceMetrics} />
    </div>
  );
};

export default TeamPerformanceChart; 