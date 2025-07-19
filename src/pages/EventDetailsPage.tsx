import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowLeft, Star } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import BookingForm from '../components/Bookings/BookingForm';
import { format } from 'date-fns';

const EventDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getEventById } = useBooking();
  const { user } = useAuth();
  
  const event = getEventById(Number(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-4">The event you're looking for doesn't exist.</p>
          <Link to="/events" className="text-blue-600 hover:text-blue-800">
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const eventDate = new Date(event.date);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/events"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Event Details */}
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-64 object-cover"
              />
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    {event.category}
                  </span>
                  {event.featured && (
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 mr-1" />
                      <span className="text-sm font-medium">Featured</span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-3" />
                    <span>{format(eventDate, 'EEEE, MMMM dd, yyyy')}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-3" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600">
                    <Users className="h-5 w-5 mr-3" />
                    <span>{event.availableSeats} seats available</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-3">About This Event</h2>
                  <p className="text-gray-600 leading-relaxed">{event.description}</p>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Organized by</h3>
                  <p className="text-gray-600">{event.organizer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Tickets</h2>
              
              {user ? (
                <BookingForm event={event} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-4">
                    Please log in to book tickets for this event.
                  </p>
                  <Link
                    to="/login"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Login to Book
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;