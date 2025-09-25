import React from 'react';
import { Search } from 'lucide-react';

interface SearchSettingsProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export default function SearchSettings({ searchTerm, onSearchChange }: SearchSettingsProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Search settings..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
      />
    </div>
  );
}

