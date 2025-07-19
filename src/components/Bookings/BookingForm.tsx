import React, { useState } from 'react';
import { Event, PriceTier } from '../../types';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { CreditCard, User, Mail, Phone } from 'lucide-react';

interface BookingFormProps {
  event: Event;
  onSuccess?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ event, onSuccess }) => {
  const { createBooking } = useBooking();
  const { user } = useAuth();
  const [selectedTier, setSelectedTier] = useState<PriceTier | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTier || !customerName || !customerEmail) return;

    setLoading(true);
    try {
      const success = await createBooking(
        event.id,
        selectedTier.name,
        quantity,
        customerName,
        customerEmail
      );
      
      if (success) {
        setSuccess(true);
        onSuccess?.();
      }
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-green-900 mb-2">Booking Confirmed!</h3>
        <p className="text-green-700">
          Your booking has been confirmed. You'll receive a confirmation email shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Details</h3>
        <div className="text-sm text-gray-600">
          <p><strong>Event:</strong> {event.title}</p>
          <p><strong>Date:</strong> {event.date} at {event.time}</p>
          <p><strong>Location:</strong> {event.location}</p>
        </div>
      </div>

      {/* Ticket Selection */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Ticket Type</h3>
        <div className="space-y-3">
          {event.priceTiers.map((tier) => (
            <div
              key={tier.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                selectedTier?.id === tier.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedTier(tier)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">{tier.name}</h4>
                  <p className="text-sm text-gray-600">{tier.description}</p>
                  <p className="text-sm text-gray-500">{tier.available} available</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${tier.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quantity */}
      {selectedTier && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[...Array(Math.min(selectedTier.available, 10))].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i + 1 === 1 ? 'ticket' : 'tickets'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Customer Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Customer Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <User className="inline h-4 w-4 mr-1" />
              Full Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="inline h-4 w-4 mr-1" />
              Email Address
            </label>
            <input
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Phone className="inline h-4 w-4 mr-1" />
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="(555) 123-4567"
          />
        </div>
      </div>

      {/* Order Summary */}
      {selectedTier && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Order Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{selectedTier.name} × {quantity}</span>
              <span>${selectedTier.price * quantity}</span>
            </div>
            <div className="border-t pt-2">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${selectedTier.price * quantity}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!selectedTier || loading || !customerName || !customerEmail}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <CreditCard className="h-5 w-5 mr-2" />
            Book Now - ${selectedTier ? selectedTier.price * quantity : 0}
          </>
        )}
      </button>
    </form>
  );
};

export default BookingForm;