import React from 'react';

interface MatchDetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const MatchDetailItem: React.FC<MatchDetailItemProps> = ({ icon, label, value }) => (
  <div className="bg-black/20 rounded-lg p-4 border border-gray-700/50">
    <div className="flex items-center gap-2 mb-2">
      {icon}
      <span className="text-gray-400 text-sm">{label}</span>
    </div>
    <p className="text-white font-medium">{value}</p>
  </div>
);

export default MatchDetailItem; 