import React from 'react';
import { Minus, SortAsc, SortDesc } from 'lucide-react';

type SortField = 'position' | 'points' | 'won' | 'lost' | 'netRunRate';
type SortDirection = 'asc' | 'desc';

interface SortIconProps {
  field: SortField;
  sortField: SortField;
  sortDirection: SortDirection;
}

const SortIcon: React.FC<SortIconProps> = ({ field, sortField, sortDirection }) => {
  if (sortField !== field) {
    return <Minus className="w-4 h-4 text-gray-500" />;
  }
  return sortDirection === 'asc'
    ? <SortAsc className="w-4 h-4 text-blue-400" />
    : <SortDesc className="w-4 h-4 text-blue-400" />;
};

export default SortIcon; 