import React, { useState, useMemo } from 'react';
import { PointsTableEntry } from '../types';
import { TrendingUp } from 'lucide-react';
import {
  EmptyState,
  TableHeader,
  TableRow,
  Legend
} from './points-table';

interface PointsTableProps {
  pointsTable: PointsTableEntry[];
}

type SortField = 'position' | 'points' | 'won' | 'lost' | 'netRunRate';
type SortDirection = 'asc' | 'desc';

const PointsTable: React.FC<PointsTableProps> = ({ pointsTable }) => {
  const [sortField, setSortField] = useState<SortField>('position');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedPointsTable = useMemo(() => {
    const sorted = [...pointsTable].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortField) {
        case 'position':
          aValue = a.position;
          bValue = b.position;
          break;
        case 'points':
          aValue = a.points;
          bValue = b.points;
          break;
        case 'won':
          aValue = a.won;
          bValue = b.won;
          break;
        case 'lost':
          aValue = a.lost;
          bValue = b.lost;
          break;
        case 'netRunRate':
          aValue = a.netRunRate;
          bValue = b.netRunRate;
          break;
        default:
          return 0;
      }

      if (sortDirection === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    return sorted;
  }, [pointsTable, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (!pointsTable || pointsTable.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-xl p-6 border border-blue-500/20">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-blue-600 p-2 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Points Table</h2>
        </div>
        <p className="text-blue-300 text-sm">Current team standings and rankings</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader
            sortField={sortField}
            sortDirection={sortDirection}
            onSort={handleSort}
          />
          <tbody>
            {sortedPointsTable.map((team) => (
              <TableRow key={team.team.id} team={team} />
            ))}
          </tbody>
        </table>
      </div>

      <Legend />
    </div>
  );
};

export default PointsTable;
