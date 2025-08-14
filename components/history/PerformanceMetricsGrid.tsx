import React from 'react';
import { TrendingUp, TrendingDown, Target } from 'lucide-react';
import { PerformanceMetrics } from '../../types';

interface PerformanceMetricsGridProps {
  metrics: PerformanceMetrics[];
}

const PerformanceMetricsGrid: React.FC<PerformanceMetricsGridProps> = ({ metrics }) => {
  const getFormIcon = (form: string[]) => {
    const recent = form.slice(-3);
    const wins = recent.filter(f => f === 'W').length;
    if (wins >= 2) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (wins === 1) return <Target className="w-4 h-4 text-yellow-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((team, index) => (
        <div key={index} className="bg-gray-800 rounded-lg border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">{team.team}</h3>
            {getFormIcon(team.form)}
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Batting Avg:</span>
              <span className="text-white font-semibold">{team.battingAverage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Bowling Avg:</span>
              <span className="text-white font-semibold">{team.bowlingAverage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Run Rate:</span>
              <span className="text-white font-semibold">{team.runRate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Win %:</span>
              <span className="text-green-400 font-semibold">{team.winPercentage}%</span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex space-x-1">
              {team.form.slice(-5).map((result, i) => (
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
          </div>
        </div>
      ))}
    </div>
  );
};

export default PerformanceMetricsGrid; 