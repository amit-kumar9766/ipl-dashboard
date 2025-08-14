import React from 'react';

type FilterType = 'all' | 'upcoming' | 'completed' | 'live';

interface FilterButtonProps {
  filter: FilterType;
  activeFilter: FilterType;
  onClick: (filter: FilterType) => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({ filter, activeFilter, onClick, children }) => (
  <button
    onClick={() => onClick(filter)}
    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
      activeFilter === filter
        ? 'bg-blue-600 text-white'
        : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600/50'
    }`}
  >
    {children}
  </button>
);

export default FilterButton; 