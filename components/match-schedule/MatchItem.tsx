import React from 'react';
import { Match } from '../../types';
import MatchHeader from './MatchHeader';
import MatchDetails from './MatchDetails';

interface MatchItemProps {
  match: Match;
  expandedMatch: string | null;
  onToggleExpanded: (matchId: string) => void;
}

const MatchItem: React.FC<MatchItemProps> = ({ match, expandedMatch, onToggleExpanded }) => {
  const isExpanded = expandedMatch === match.id;

  return (
    <div className="mb-4">
      <MatchHeader
        match={match}
        expandedMatch={expandedMatch}
        onToggleExpanded={onToggleExpanded}
      />
      {isExpanded && <MatchDetails match={match} />}
    </div>
  );
};

export default MatchItem; 