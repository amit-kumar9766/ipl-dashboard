import React from 'react';

const AnimatedBackground: React.FC = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute top-10 left-10 w-20 h-20 bg-red-500/5 rounded-full animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-500/5 rounded-full animate-pulse delay-1000"></div>
    <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-500/5 rounded-full animate-pulse delay-500"></div>
  </div>
);

export default AnimatedBackground; 