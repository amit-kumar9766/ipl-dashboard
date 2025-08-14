import React from 'react';
import { Button } from '../ui';

type TabType = 'overview' | 'matches' | 'points' | 'history';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'matches', label: 'Matches' },
    { id: 'points', label: 'Points Table' },
    { id: 'history', label: 'History & Analytics' }
  ];

  return (
    <div className="flex space-x-1 p-4">
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => onTabChange(tab.id as TabType)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default TabNavigation; 