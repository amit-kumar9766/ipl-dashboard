import React, { useState } from 'react';
import { 
  HistoricalHeader, 
  HistoricalTabNavigation, 
  RecentMatchesSection,
  TopBatsmenChart,
  TopBowlersChart,
  PlayerStatsTable,
  TeamPerformanceChart,
  WinLossDistribution,
  TeamHistoryTable,
  PerformanceMetricsGrid,
  RunRateChart
} from './index';
import { HistoricalMatch, PlayerStats, TeamHistory, PerformanceMetrics } from '../../types';

interface HistoricalDataProps {
  historicalMatches: HistoricalMatch[];
  playerStats: PlayerStats[];
  teamHistory: TeamHistory[];
  performanceMetrics: PerformanceMetrics[];
}

const HistoricalData: React.FC<HistoricalDataProps> = ({
  historicalMatches,
  playerStats,
  teamHistory,
  performanceMetrics
}) => {
  const [activeTab, setActiveTab] = useState<'matches' | 'players' | 'playerStats' | 'teams' | 'analytics'>('matches');

  const recentMatches = historicalMatches.slice(0, 10);

  const handleTabChange = (tab: 'matches' | 'players' | 'playerStats' | 'teams' | 'analytics') => {
    setActiveTab(tab);
  };

  return (
    <div className="space-y-6">
      <HistoricalHeader />
      
      <HistoricalTabNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="space-y-6">
        {activeTab === 'matches' && (
          <RecentMatchesSection matches={recentMatches} />
        )}

        {activeTab === 'players' && (
          <div className="space-y-6">
            <TopBatsmenChart players={playerStats} />
            <TopBowlersChart players={playerStats} />
          </div>
        )}

        {activeTab === 'playerStats' && (
          <PlayerStatsTable players={playerStats} />
        )}

        {activeTab === 'teams' && (
          <div className="space-y-6">
            <TeamPerformanceChart performanceMetrics={performanceMetrics} />
            <WinLossDistribution teams={teamHistory} />
            <TeamHistoryTable teams={teamHistory} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <PerformanceMetricsGrid metrics={performanceMetrics} />
            <RunRateChart performanceMetrics={performanceMetrics} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalData; 