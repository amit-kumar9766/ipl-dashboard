import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

interface PositionIconProps {
  position: number;
}

const PositionIcon: React.FC<PositionIconProps> = ({ position }) => {
  switch (position) {
    case 1:
      return <Trophy className="w-5 h-5 text-yellow-400" />;
    case 2:
      return <Medal className="w-5 h-5 text-gray-400" />;
    case 3:
      return <Award className="w-5 h-5 text-amber-600" />;
    default:
      return <span className="text-gray-400 font-semibold">{position}</span>;
  }
};

export default PositionIcon; 