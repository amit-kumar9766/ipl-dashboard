import React from 'react';
import SortIcon from './SortIcon';

type SortField = 'position' | 'points' | 'won' | 'lost' | 'netRunRate';
type SortDirection = 'asc' | 'desc';

interface TableHeaderProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({ sortField, sortDirection, onSort }) => {
  return (
    <thead>
      <tr className="border-b border-gray-700/50">
        <th className="text-left py-4 px-4">
          <button
            onClick={() => onSort('position')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <span>Pos</span>
            <SortIcon field="position" sortField={sortField} sortDirection={sortDirection} />
          </button>
        </th>
        <th className="text-left py-4 px-4">
          <span className="text-gray-300">Team</span>
        </th>
        <th className="text-center py-4 px-4">
          <button
            onClick={() => onSort('points')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <span>Pts</span>
            <SortIcon field="points" sortField={sortField} sortDirection={sortDirection} />
          </button>
        </th>
        <th className="text-center py-4 px-4">
          <button
            onClick={() => onSort('won')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <span>W</span>
            <SortIcon field="won" sortField={sortField} sortDirection={sortDirection} />
          </button>
        </th>
        <th className="text-center py-4 px-4">
          <button
            onClick={() => onSort('lost')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <span>L</span>
            <SortIcon field="lost" sortField={sortField} sortDirection={sortDirection} />
          </button>
        </th>
        <th className="text-center py-4 px-4">
          <span className="text-gray-300">T</span>
        </th>
        <th className="text-center py-4 px-4">
          <span className="text-gray-300">NR</span>
        </th>
        <th className="text-center py-4 px-4">
          <button
            onClick={() => onSort('netRunRate')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <span>NRR</span>
            <SortIcon field="netRunRate" sortField={sortField} sortDirection={sortDirection} />
          </button>
        </th>
      </tr>
    </thead>
  );
};

export default TableHeader; 