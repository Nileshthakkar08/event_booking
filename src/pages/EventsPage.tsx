import React, { useState } from 'react';
import { useBooking } from '../context/BookingContext';
import EventCard from '../components/Events/EventCard';
import EventFilters from '../components/Events/EventFilters';

const EventsPage: React.FC = () => {
  const { events } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !category || event.category === category;
    const matchesDate = !date || event.date === date;
    const matchesLocation = !location || event.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesDate && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Events</h1>
          <p className="text-lg text-gray-600">
            Discover amazing events happening near you
          </p>
        </div>

        <EventFilters
          searchQuery={searchQuery}
          category={category}
          date={date}
          location={location}
          onSearchChange={setSearchQuery}
          onCategoryChange={setCategory}
          onDateChange={setDate}
          onLocationChange={setLocation}
        />

        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found matching your criteria.</p>
            <p className="text-gray-400 mt-2">Try adjusting your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;