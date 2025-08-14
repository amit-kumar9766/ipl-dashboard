import React, { useState, useMemo } from 'react';
import { Match } from '../types';
import { Calendar } from 'lucide-react';
import {
  EmptyState,
  FilterButton,
  SearchComponent,
  MatchItem
} from './match-schedule';

interface MatchScheduleProps {
  upcomingMatches: Match[];
  schedule: Match[];
}

type FilterType = 'all' | 'upcoming' | 'completed' | 'live';

const MatchSchedule: React.FC<MatchScheduleProps> = ({ upcomingMatches, schedule }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedMatch, setExpandedMatch] = useState<string | null>(null);

  const allMatches = useMemo(() => {
    return [...upcomingMatches, ...schedule];
  }, [upcomingMatches, schedule]);

  const filteredMatches = useMemo(() => {
    let filtered = allMatches;

    if (activeFilter !== 'all') {
      filtered = filtered.filter(match => match.status === activeFilter);
    }

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(match =>
        match.team1.name.toLowerCase().includes(searchLower) ||
        match.team2.name.toLowerCase().includes(searchLower) ||
        match.venue.toLowerCase().includes(searchLower) ||
        match.matchNumber?.toLowerCase().includes(searchLower)
      );
    }

    return filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [allMatches, activeFilter, searchTerm]);

  const handleToggleExpanded = (matchId: string) => {
    setExpandedMatch(expandedMatch === matchId ? null : matchId);
  };

  if (!allMatches || allMatches.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/20">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-purple-600 p-2 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Match Schedule</h2>
        </div>
        <p className="text-purple-300 text-sm">Complete IPL 2025 fixture list and results</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          <FilterButton
            filter="all"
            activeFilter={activeFilter}
            onClick={setActiveFilter}
          >
            All ({allMatches.length})
          </FilterButton>
          <FilterButton
            filter="upcoming"
            activeFilter={activeFilter}
            onClick={setActiveFilter}
          >
            Upcoming ({allMatches.filter(m => m.status === 'upcoming').length})
          </FilterButton>
          <FilterButton
            filter="live"
            activeFilter={activeFilter}
            onClick={setActiveFilter}
          >
            Live ({allMatches.filter(m => m.status === 'live').length})
          </FilterButton>
          <FilterButton
            filter="completed"
            activeFilter={activeFilter}
            onClick={setActiveFilter}
          >
            Completed ({allMatches.filter(m => m.status === 'completed').length})
          </FilterButton>
        </div>

        <SearchComponent
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
      </div>

      <div className="space-y-4">
        {filteredMatches.map((match) => (
          <MatchItem
            key={match.id}
            match={match}
            expandedMatch={expandedMatch}
            onToggleExpanded={handleToggleExpanded}
          />
        ))}
      </div>
    </div>
  );
};

export default MatchSchedule;
