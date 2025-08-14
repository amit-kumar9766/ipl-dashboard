import React from 'react';

const TopStrip: React.FC = () => {
  return (
    <div className="bg-blue-900 text-white py-2">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">IPL 2025</span>
            </div>
            <span className="text-gray-300">|</span>
            <a href="https://www.bcci.tv/" target="_blank" rel="noopener noreferrer" 
               className="flex items-center space-x-1 hover:text-blue-300 transition-colors">
              <span>BCCI.TV</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 text-xs">Follow Us</span>
            <a href="https://twitter.com/IPL" target="_blank" rel="noopener noreferrer" 
               className="text-gray-300 hover:text-blue-400 transition-colors">
              Twitter
            </a>
            <a href="https://www.facebook.com/IPL/" target="_blank" rel="noopener noreferrer" 
               className="text-gray-300 hover:text-blue-400 transition-colors">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopStrip; 