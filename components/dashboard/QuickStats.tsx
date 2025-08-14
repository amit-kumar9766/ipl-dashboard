import React from 'react';
import { Card } from '../ui';

interface QuickStatsProps {
  upcomingMatches: number;
  teams: number;
  totalMatches: number;
  liveMatches: number;
}

const QuickStats: React.FC<QuickStatsProps> = ({
  upcomingMatches,
  teams,
  totalMatches,
  liveMatches
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card variant="elevated" className="text-center">
        <div className="p-4">
          <h3 className="text-2xl font-bold text-white">
            {upcomingMatches}
          </h3>
          <p className="text-gray-400">Upcoming Matches</p>
        </div>
      </Card>
      
      <Card variant="elevated" className="text-center">
        <div className="p-4">
          <h3 className="text-2xl font-bold text-white">
            {teams}
          </h3>
          <p className="text-gray-400">Teams</p>
        </div>
      </Card>
      
      <Card variant="elevated" className="text-center">
        <div className="p-4">
          <h3 className="text-2xl font-bold text-white">
            {totalMatches}
          </h3>
          <p className="text-gray-400">Total Matches</p>
        </div>
      </Card>
      
      <Card variant="elevated" className="text-center">
        <div className="p-4">
          <h3 className="text-2xl font-bold text-white">
            {liveMatches}
          </h3>
          <p className="text-gray-400">Live Matches</p>
        </div>
      </Card>
    </div>
  );
};

export default QuickStats; 