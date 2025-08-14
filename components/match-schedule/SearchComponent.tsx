import React from 'react';
import { Search } from 'lucide-react';

interface SearchComponentProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ searchTerm, onSearchChange }) => (
  <div className="relative">
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search matches..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50"
    />
  </div>
);

export default SearchComponent; 