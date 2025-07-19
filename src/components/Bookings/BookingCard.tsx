import React from 'react';
import { format } from 'date-fns';
import { Calendar, MapPin, Users, DollarSign, Download, X } from 'lucide-react';
import { Booking } from '../../types';
import { useBooking } from '../../context/BookingContext';

interface BookingCardProps {
  booking: Booking;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const { cancelBooking } = useBooking();
  
  const handleCancel = async () => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(booking.id);
    }
  };

  const handleDownload = () => {
    // Create a simple ticket download (in real app, this would generate a PDF)
    const ticketData = {
      eventTitle: booking.event.title,
      date: booking.event.date,
      time: booking.event.time,
      location: booking.event.location,
      customerName: booking.customerName,
      ticketType: booking.ticketType,
      quantity: booking.quantity,
      qrCode: booking.qrCode
    };
    
    const blob = new Blob([JSON.stringify(ticketData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ticket-${booking.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img 
            className="h-48 w-full object-cover md:h-full md:w-48" 
            src={booking.event.imageUrl} 
            alt={booking.event.title}
          />
        </div>
        
        <div className="p-6 flex-1">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{booking.event.title}</h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </span>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">${booking.totalPrice}</p>
              <p className="text-sm text-gray-600">{booking.quantity} × {booking.ticketType}</p>
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="text-sm">
                {format(new Date(booking.event.date), 'MMM dd, yyyy')} at {booking.event.time}
              </span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <MapPin className="h-4 w-4 mr-2" />
              <span className="text-sm">{booking.event.location}</span>
            </div>
            
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span className="text-sm">Booked by {booking.customerName}</span>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {booking.status === 'confirmed' && (
              <>
                <button
                  onClick={handleDownload}
                  className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download Ticket
                </button>
                
                <button
                  onClick={handleCancel}
                  className="flex items-center px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;