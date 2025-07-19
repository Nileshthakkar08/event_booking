import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, DollarSign, Star, Clock } from 'lucide-react';
import { Event } from '../../types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  featured?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const eventDate = new Date(event.date);
  const minPrice = Math.min(...event.priceTiers.map(tier => tier.price));
  
  return (
    <div className={`card overflow-hidden transition-all duration-300 hover:shadow-premium hover:-translate-y-2 group ${
      featured ? 'ring-2 ring-accent-600 ring-offset-2' : ''
    }`}>
      {featured && (
        <div className="gradient-accent text-white text-center py-3">
          <div className="flex items-center justify-center">
            <Star className="h-4 w-4 mr-2" />
            <span className="font-semibold">Featured Event</span>
          </div>
        </div>
      )}
      
      <div className="relative">
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-card">
          <span className="text-sm font-semibold text-primary-900">{event.category}</span>
        </div>
        <div className="absolute bottom-4 left-4 bg-primary-900/90 backdrop-blur-sm rounded-xl px-3 py-2 text-white">
          <div className="flex items-center text-sm font-medium">
            <Clock className="h-3 w-3 mr-1" />
            {event.time}
          </div>
        </div>
      </div>
      
      <div className="p-6 lg:p-8">
        <h3 className="text-xl font-bold text-primary-900 mb-3 line-clamp-2 group-hover:text-accent-600 transition-colors duration-200">
          {event.title}
        </h3>
        <p className="text-secondary mb-6 line-clamp-2 leading-relaxed">{event.description}</p>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-secondary">
            <div className="p-1 bg-primary-50 rounded mr-3">
              <Calendar className="h-4 w-4 text-primary-900" />
            </div>
            <span className="text-sm font-medium">
              {format(eventDate, 'MMM dd, yyyy')} at {event.time}
            </span>
          </div>
          
          <div className="flex items-center text-secondary">
            <div className="p-1 bg-primary-50 rounded mr-3">
              <MapPin className="h-4 w-4 text-primary-900" />
            </div>
            <span className="text-sm font-medium">{event.location}</span>
          </div>
          
          <div className="flex items-center text-secondary">
            <div className="p-1 bg-primary-50 rounded mr-3">
              <Users className="h-4 w-4 text-primary-900" />
            </div>
            <span className="text-sm font-medium">{event.availableSeats} seats available</span>
          </div>
        </div>
        
<div className="flex items-center justify-between">
  <div className="flex items-center">
    <div className="p-1 bg-accent-50 rounded mr-2">
      <DollarSign className="h-4 w-4 text-accent-600" />
    </div>
    <div>
      <span className="text-xs text-secondary block">From</span>
      <span className="font-bold text-primary-900 text-lg">${minPrice}</span>
    </div>
  </div>
  
  <Link
    to={`/event/${event.id}`}
    className="btn-primary px-4 py-2 rounded-lg text-white bg-primary-900 hover:bg-primary-700 transition-colors duration-200"
  >
    View Details
  </Link>
</div>
      </div>
    </div>
  );
};

export default EventCard;