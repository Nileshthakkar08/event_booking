import React from 'react';
import { Search, Filter, Calendar, MapPin, Tag } from 'lucide-react';

interface EventFiltersProps {
  searchQuery: string;
  category: string;
  date: string;
  location: string;
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onDateChange: (date: string) => void;
  onLocationChange: (location: string) => void;
}

const EventFilters: React.FC<EventFiltersProps> = ({
  searchQuery,
  category,
  date,
  location,
  onSearchChange,
  onCategoryChange,
  onDateChange,
  onLocationChange
}) => {
  const categories = ['All', 'Technology', 'Music', 'Business', 'Art', 'Sports', 'Food', 'Health'];
  
  return (
    <div className="card p-8 mb-12">
      <div className="flex items-center mb-8">
        <div className="p-2 bg-primary-50 rounded-xl mr-3">
          <Filter className="h-5 w-5 text-primary-900" />
        </div>
        <h2 className="text-xl font-semibold text-primary-900">Filter Events</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div className="relative">
          <label className="block text-sm font-semibold text-primary-900 mb-3">Search Events</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="input-field pl-12"
            />
          </div>
        </div>
        
        {/* Category */}
        <div className="relative">
          <label className="block text-sm font-semibold text-primary-900 mb-3">Category</label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="input-field pl-12 appearance-none bg-white cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat === 'All' ? '' : cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Date */}
        <div className="relative">
          <label className="block text-sm font-semibold text-primary-900 mb-3">Date</label>
          <div className="relative">
            <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="input-field pl-12"
            />
          </div>
        </div>
        
        {/* Location */}
        <div className="relative">
          <label className="block text-sm font-semibold text-primary-900 mb-3">Location</label>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-secondary" />
            <input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => onLocationChange(e.target.value)}
              className="input-field pl-12"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;