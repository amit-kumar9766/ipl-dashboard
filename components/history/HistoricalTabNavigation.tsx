import React from 'react';
import { Calendar, Users, Trophy, BarChart3, Table } from 'lucide-react';

type TabType = 'matches' | 'players' | 'playerStats' | 'teams' | 'analytics';

interface HistoricalTabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const HistoricalTabNavigation: React.FC<HistoricalTabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'matches', label: 'Recent Matches', icon: Calendar },
    { id: 'players', label: 'Player Charts', icon: Users },
    { id: 'playerStats', label: 'Player Stats Table', icon: Table },
    { id: 'teams', label: 'Team History', icon: Trophy },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as TabType)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
            activeTab === tab.id
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          <span className="font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default HistoricalTabNavigation; 