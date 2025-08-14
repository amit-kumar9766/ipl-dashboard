import React from 'react';
import { MapPin, Clock, Calendar } from 'lucide-react';
import { Match } from '../../types';
import MatchDetailItem from './MatchDetailItem';

interface MatchDetailsProps {
  match: Match;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ match }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    <MatchDetailItem
      icon={<MapPin className="w-4 h-4 text-gray-400" />}
      label="Venue"
      value={match.venue}
    />
    <MatchDetailItem
      icon={<Clock className="w-4 h-4 text-gray-400" />}
      label="Time"
      value={match.time}
    />
    <MatchDetailItem
      icon={<Calendar className="w-4 h-4 text-gray-400" />}
      label="Date"
      value={new Date(match.date).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
      })}
    />
  </div>
);

export default MatchDetails; 