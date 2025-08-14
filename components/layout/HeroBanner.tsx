import React from 'react';

type TabType = 'overview' | 'matches' | 'points' | 'history';

interface HeroBannerProps {
  onTabChange?: (tab: TabType) => void;
}

const HeroTitle: React.FC = () => (
  <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">
    IPL 2025
    <span className="block text-blue-300">Live Dashboard</span>
  </h2>
);

const HeroDescription: React.FC = () => (
  <p className="text-xl text-gray-200 mb-6">
    Real-time match updates, live scores, team standings, and comprehensive analytics. 
    Stay connected with the biggest cricket festival.
  </p>
);

interface HeroButtonsProps {
  onTabChange?: (tab: TabType) => void;
}

const HeroButtons: React.FC<HeroButtonsProps> = ({ onTabChange }) => {
  const handleLiveMatchesClick = () => {
    if (onTabChange) {
      onTabChange('matches');
    }
  };

  const handlePointsTableClick = () => {
    if (onTabChange) {
      onTabChange('points');
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      <button 
        onClick={handleLiveMatchesClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        View Live Matches
      </button>
      <button 
        onClick={handlePointsTableClick}
        className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
      >
        Points Table
      </button>
    </div>
  );
};

interface StatsItemProps {
  value: string;
  label: string;
}

const StatsItem: React.FC<StatsItemProps> = ({ value, label }) => (
  <div className="text-center">
    <div className="text-2xl font-bold text-blue-300">{value}</div>
    <div className="text-sm text-gray-400">{label}</div>
  </div>
);

const HeroStats: React.FC = () => (
  <div className="flex justify-center space-x-4">
    <StatsItem value="10" label="Teams" />
    <StatsItem value="74" label="Matches" />
    <StatsItem value="Live" label="Scores" />
  </div>
);

const HeroVisual: React.FC = () => (
  <div className="relative">
    <div className="bg-blue-800/20 rounded-2xl p-8 border border-blue-500/30">
      <div className="text-center">
        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-white text-2xl">🏆</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Live Updates</h3>
        <p className="text-gray-300 mb-4">Get instant notifications for match events</p>
        <HeroStats />
      </div>
    </div>
  </div>
);

const HeroBanner: React.FC<HeroBannerProps> = ({ onTabChange }) => {
  return (
    <section className="bg-blue-900 overflow-hidden">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <HeroTitle />
            <HeroDescription />
            <HeroButtons onTabChange={onTabChange} />
          </div>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner; 