import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Star, ArrowRight, Sparkles, TrendingUp, Award } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import EventCard from '../components/Events/EventCard';
import EventFilters from '../components/Events/EventFilters';

const HomePage: React.FC = () => {
  const { events, stats } = useBooking();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');

  const featuredEvents = events.filter(event => event.featured).slice(0, 3);
  const upcomingEvents = events.slice(0, 8);

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !category || event.category === category;
    const matchesDate = !date || event.date === date;
    const matchesLocation = !location || event.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesSearch && matchesCategory && matchesDate && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-bg text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-action mr-3" />
              <span className="text-action font-semibold text-lg">Premium Events Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              Discover Amazing Events
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Find and book tickets to concerts, conferences, workshops, and more
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/events"
                className="bg-white text-primary-900 px-8 py-4 rounded-xl font-semibold hover:bg-white/90 transition-all duration-200 transform hover:scale-105 shadow-card-hover"
              >
                Browse Events
              </Link>
             
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            <div className="text-center group">
              <div className="flex items-center justify-center w-20 h-20 bg-primary-50 rounded-2xl mx-auto mb-6 group-hover:bg-primary-100 transition-colors duration-200">
                <Calendar className="h-10 w-10 text-primary-900" />
              </div>
              <h3 className="text-4xl font-bold text-primary-900 mb-2">{stats.totalEvents}</h3>
              <p className="text-secondary font-medium">Active Events</p>
            </div>
            
            <div className="text-center group">
              <div className="flex items-center justify-center w-20 h-20 bg-accent-50 rounded-2xl mx-auto mb-6 group-hover:bg-accent-100 transition-colors duration-200">
                <Users className="h-10 w-10 text-accent-600" />
              </div>
              <h3 className="text-4xl font-bold text-primary-900 mb-2">{stats.totalBookings}</h3>
              <p className="text-secondary font-medium">Happy Customers</p>
            </div>
            
            <div className="text-center group">
              <div className="flex items-center justify-center w-20 h-20 bg-action/20 rounded-2xl mx-auto mb-6 group-hover:bg-action/30 transition-colors duration-200">
                <Award className="h-10 w-10 text-primary-900" />
              </div>
              <h3 className="text-4xl font-bold text-primary-900 mb-2">{featuredEvents.length}</h3>
              <p className="text-secondary font-medium">Featured Events</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-20 bg-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Star className="h-6 w-6 text-accent-600 mr-2" />
              <span className="text-accent-600 font-semibold">FEATURED</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">Featured Events</h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">Don't miss these amazing upcoming events</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} featured />
            ))}
          </div>
        </div>
      </section>

      {/* Event Search */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-primary-900 mr-2" />
              <span className="text-primary-900 font-semibold">DISCOVER</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary-900 mb-6">Find Your Perfect Event</h2>
            <p className="text-xl text-secondary max-w-2xl mx-auto">Search through hundreds of events happening near you</p>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            {filteredEvents.slice(0, 8).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/events"
              className="inline-flex items-center btn-primary text-lg"
            >
              View All Events
              <ArrowRight className="ml-3 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;