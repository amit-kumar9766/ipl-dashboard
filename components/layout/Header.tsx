import React from 'react';

type TabType = 'overview' | 'matches' | 'points' | 'history';

interface HeaderProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

const HeaderLogo: React.FC = () => (
  <div className="flex items-center space-x-2">
    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
      <span className="text-white font-bold">IPL</span>
    </div>
    <div>
      <h1 className="text-xl font-bold text-white">IPL Dashboard</h1>
      <p className="text-xs text-gray-400">Live Updates & Analytics</p>
    </div>
  </div>
);

interface NavigationLinksProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

const NavigationLinks: React.FC<NavigationLinksProps> = ({ activeTab, onTabChange }) => {
  const handleTabClick = (tab: TabType) => {
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <button
        onClick={() => handleTabClick('overview')}
        className={`transition-colors ${
          activeTab === 'overview' 
            ? 'text-white' 
            : 'text-gray-300 hover:text-blue-400'
        }`}
      >
        Overview
      </button>
      <button
        onClick={() => handleTabClick('matches')}
        className={`transition-colors ${
          activeTab === 'matches' 
            ? 'text-white' 
            : 'text-gray-300 hover:text-blue-400'
        }`}
      >
        Matches
      </button>
      <button
        onClick={() => handleTabClick('points')}
        className={`transition-colors ${
          activeTab === 'points' 
            ? 'text-white' 
            : 'text-gray-300 hover:text-blue-400'
        }`}
      >
        Points Table
      </button>
      <button
        onClick={() => handleTabClick('history')}
        className={`transition-colors ${
          activeTab === 'history' 
            ? 'text-white' 
            : 'text-gray-300 hover:text-blue-400'
        }`}
      >
        History & Analytics
      </button>
    </nav>
  );
};

const LiveStatus: React.FC = () => (
  <div className="hidden md:flex items-center space-x-2 text-green-400">
    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
    <span className="text-sm font-medium">Live</span>
  </div>
);

const NotificationButton: React.FC = () => (
  <button className="p-2 text-gray-300 hover:text-blue-400 transition-colors relative">
    <span className="text-lg">🔔</span>
    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
      2
    </span>
  </button>
);

interface MobileMenuToggleProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuToggle: React.FC<MobileMenuToggleProps> = ({ isMenuOpen, toggleMenu }) => (
  <button
    onClick={toggleMenu}
    className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
  >
    {isMenuOpen ? '✕' : '☰'}
  </button>
);

interface MobileNavigationProps {
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
  toggleMenu: () => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, onTabChange, toggleMenu }) => {
  const handleTabClick = (tab: TabType) => {
    if (onTabChange) {
      onTabChange(tab);
    }
    toggleMenu();
  };

  return (
    <nav className="container mx-auto px-4 py-4 space-y-2">
      <button
        onClick={() => handleTabClick('overview')}
        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          activeTab === 'overview' 
            ? 'text-white bg-gray-700' 
            : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        Overview
      </button>
      <button
        onClick={() => handleTabClick('matches')}
        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          activeTab === 'matches' 
            ? 'text-white bg-gray-700' 
            : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        Matches
      </button>
      <button
        onClick={() => handleTabClick('points')}
        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          activeTab === 'points' 
            ? 'text-white bg-gray-700' 
            : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        Points Table
      </button>
      <button
        onClick={() => handleTabClick('history')}
        className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
          activeTab === 'history' 
            ? 'text-white bg-gray-700' 
            : 'text-gray-300 hover:bg-gray-700'
        }`}
      >
        History & Analytics
      </button>
    </nav>
  );
};

const Header: React.FC<HeaderProps> = ({ isMenuOpen, toggleMenu, activeTab, onTabChange }) => {
  return (
    <header className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <HeaderLogo />
          </div>

          <NavigationLinks activeTab={activeTab} onTabChange={onTabChange} />

          <div className="flex items-center space-x-4">
            <LiveStatus />
            <NotificationButton />
            <MobileMenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          </div>
        </div>

        {isMenuOpen && (
          <MobileNavigation 
            activeTab={activeTab} 
            onTabChange={onTabChange} 
            toggleMenu={toggleMenu}
          />
        )}
      </div>
    </header>
  );
};

export default Header; 