import React from 'react';
import { Calendar, Download, X, CheckCircle, Clock, XCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import BookingCard from '../components/Bookings/BookingCard';
import { format } from 'date-fns';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const { getBookingsByUserId } = useBooking();
  
  const userBookings = user ? getBookingsByUserId(user.id) : [];
  const upcomingBookings = userBookings.filter(booking => 
    booking.status === 'confirmed' && new Date(booking.event.date) > new Date()
  );
  const pastBookings = userBookings.filter(booking => 
    new Date(booking.event.date) < new Date()
  );

  const getBookingStats = () => {
    const confirmed = userBookings.filter(b => b.status === 'confirmed').length;
    const cancelled = userBookings.filter(b => b.status === 'cancelled').length;
    const pending = userBookings.filter(b => b.status === 'pending').length;
    
    return { confirmed, cancelled, pending };
  };

  const stats = getBookingStats();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Manage your bookings and discover new events</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{userBookings.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Confirmed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
          {upcomingBookings.length > 0 ? (
            <div className="space-y-6">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Upcoming Events</h3>
              <p className="text-gray-600 mb-4">You don't have any upcoming bookings.</p>
              <a
                href="/events"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Events
              </a>
            </div>
          )}
        </div>

        {/* Past Bookings */}
        {pastBookings.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Events</h2>
            <div className="space-y-6">
              {pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;