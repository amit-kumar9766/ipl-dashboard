import React from 'react';
import { Match } from '../types';
import {
  NoMatchState,
  LiveIndicator,
  MatchHeader,
  TeamScore,
  VSIndicator,
  MatchDetails,
  LiveUpdatesBar,
  AnimatedBackground
} from './live-match';

interface LiveMatchProps {
  match: Match | null;
}

const LiveMatch: React.FC<LiveMatchProps> = ({ match }) => {
  if (!match) {
    return <NoMatchState />;
  }

  const isLive = match.status === 'live';
  const hasScores = Boolean(match.score1 && match.score1 !== 'N/A' && match.score2 && match.score2 !== 'N/A');

  return (
    <div className="bg-gradient-to-br from-red-900/30 to-orange-900/30 rounded-xl p-6 border border-red-500/20 relative overflow-hidden">
      <LiveIndicator />
      <MatchHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <TeamScore
          team={match.team1}
          score={match.score1}
          teamColor="from-blue-600 to-blue-800"
          shortNameColor="text-blue-300"
        />
        <TeamScore
          team={match.team2}
          score={match.score2}
          teamColor="from-green-600 to-green-800"
          shortNameColor="text-green-300"
        />
      </div>

      <VSIndicator />
      <MatchDetails match={match} />
      <LiveUpdatesBar match={match} hasScores={hasScores} />
      <AnimatedBackground />
    </div>
  );
};

export default LiveMatch;
