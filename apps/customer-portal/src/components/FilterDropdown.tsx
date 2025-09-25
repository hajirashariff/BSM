import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, X, Check } from 'lucide-react';

interface FilterOption {
  id: string;
  label: string;
  icon?: React.ComponentType<any>;
  color?: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  multiSelect?: boolean;
  className?: string;
}

export default function FilterDropdown({
  label,
  options,
  selectedValues,
  onSelectionChange,
  placeholder = "Select options...",
  searchable = true,
  multiSelect = true,
  className = ""
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredOptions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : filteredOptions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
          handleOptionClick(filteredOptions[highlightedIndex].id);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleOptionClick = (optionId: string) => {
    if (multiSelect) {
      const newSelection = selectedValues.includes(optionId)
        ? selectedValues.filter(id => id !== optionId)
        : [...selectedValues, optionId];
      onSelectionChange(newSelection);
    } else {
      onSelectionChange([optionId]);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleClearAll = () => {
    onSelectionChange([]);
  };

  const handleRemoveValue = (valueId: string) => {
    onSelectionChange(selectedValues.filter(id => id !== valueId));
  };

  const getDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const option = options.find(opt => opt.id === selectedValues[0]);
      return option?.label || placeholder;
    }
    return `${selectedValues.length} selected`;
  };

  const getSelectedOptions = () => {
    return options.filter(option => selectedValues.includes(option.id));
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-zinc-300 mb-2">
        {label}
      </label>
      
      {/* Selected values display */}
      {selectedValues.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {getSelectedOptions().map(option => (
            <span
              key={option.id}
              className="inline-flex items-center px-2 py-1 bg-primary-100 text-primary-800 text-xs rounded-full dark:bg-primary-900 dark:text-primary-300"
            >
              {option.icon && <option.icon size={12} className="mr-1" />}
              {option.label}
              <button
                onClick={() => handleRemoveValue(option.id)}
                className="ml-1 text-primary-600 hover:text-primary-800 dark:text-primary-400 dark:hover:text-primary-200"
              >
                <X size={12} />
              </button>
            </span>
          ))}
          {multiSelect && selectedValues.length > 1 && (
            <button
              onClick={handleClearAll}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-300"
            >
              Clear all
            </button>
          )}
        </div>
      )}

      {/* Dropdown trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-lg bg-white dark:bg-zinc-800 dark:border-zinc-700 hover:border-gray-400 dark:hover:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      >
        <span className="text-left text-gray-900 dark:text-zinc-100 truncate">
          {getDisplayText()}
        </span>
        <ChevronDown 
          size={16} 
          className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg shadow-lg max-h-60 overflow-hidden">
          {/* Search input */}
          {searchable && (
            <div className="p-2 border-b border-gray-200 dark:border-zinc-700">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setHighlightedIndex(-1);
                  }}
                  placeholder="Search options..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-zinc-700 dark:border-zinc-600 dark:text-zinc-100"
                />
              </div>
            </div>
          )}

          {/* Options list */}
          <div className="max-h-48 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-2 text-sm text-gray-500 dark:text-zinc-400 text-center">
                No options found
              </div>
            ) : (
              filteredOptions.map((option, index) => {
                const isSelected = selectedValues.includes(option.id);
                const isHighlighted = index === highlightedIndex;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 ${
                      isHighlighted ? 'bg-gray-100 dark:bg-zinc-700' : ''
                    } ${isSelected ? 'bg-primary-50 dark:bg-primary-900' : ''}`}
                  >
                    <div className="flex items-center space-x-2">
                      {option.icon && (
                        <option.icon 
                          size={16} 
                          className={option.color || 'text-gray-500 dark:text-zinc-400'} 
                        />
                      )}
                      <span className="text-gray-900 dark:text-zinc-100">
                        {option.label}
                      </span>
                    </div>
                    {isSelected && (
                      <Check size={16} className="text-primary-600 dark:text-primary-400" />
                    )}
                  </button>
                );
              })
            )}
          </div>

          {/* Footer with clear option */}
          {selectedValues.length > 0 && (
            <div className="p-2 border-t border-gray-200 dark:border-zinc-700">
              <button
                onClick={handleClearAll}
                className="w-full text-left px-2 py-1 text-sm text-gray-600 hover:text-gray-800 dark:text-zinc-400 dark:hover:text-zinc-300"
              >
                Clear all selections
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

