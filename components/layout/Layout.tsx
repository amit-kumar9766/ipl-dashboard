import React, { useState } from 'react';
import { TopStrip, Header, HeroBanner, Footer } from './index';

type TabType = 'overview' | 'matches' | 'points' | 'history';

interface LayoutProps {
  children: React.ReactNode;
  activeTab?: TabType;
  onTabChange?: (tab: TabType) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-screen bg-gray-900">
      <TopStrip />
      <Header 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu}
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
      <HeroBanner onTabChange={onTabChange} />
      
      <main className="flex-1">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout; 