import React from 'react';
import { Zap } from 'lucide-react';
import { PerformanceMetrics } from '../../types';

interface RunRateChartProps {
  performanceMetrics: PerformanceMetrics[];
}

const RunRateChart: React.FC<RunRateChartProps> = ({ performanceMetrics }) => {
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
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Zap className="w-5 h-5 mr-2 text-yellow-400" />
          Run Rate vs Win Percentage
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-3">
          {teamPerformanceData.map((team, index) => (
            <div key={index} className="p-3 bg-gray-700 rounded">
              <div className="text-white font-medium mb-2">{team.name}</div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Run Rate:</span>
                  <span className="text-green-400">{team.runRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Win %:</span>
                  <span className="text-red-400">{team.winPercentage}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RunRateChart; 