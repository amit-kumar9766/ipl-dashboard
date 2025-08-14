import React from 'react';
import { Calendar } from 'lucide-react';

const EmptyState: React.FC = () => (
  <div className="text-center py-12">
    <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
    <h3 className="text-lg font-semibold text-white mb-2">No matches found</h3>
    <p className="text-gray-400">Try adjusting your filters or search terms</p>
  </div>
);

export default EmptyState; 