import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Event, Booking, BookingStats } from '../types';
import { format } from 'date-fns';

interface BookingContextType {
  events: Event[];
  bookings: Booking[];
  stats: BookingStats;
  createBooking: (eventId: number, ticketType: string, quantity: number, customerName: string, customerEmail: string) => Promise<boolean>;
  cancelBooking: (bookingId: number) => Promise<boolean>;
  createEvent: (eventData: Partial<Event>) => Promise<boolean>;
  updateEvent: (eventId: number, eventData: Partial<Event>) => Promise<boolean>;
  deleteEvent: (eventId: number) => Promise<boolean>;
  getEventById: (id: number) => Event | undefined;
  getBookingsByUserId: (userId: number) => Booking[];
  searchEvents: (query: string, category?: string, date?: string) => Event[];
  loading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize with demo data
    const demoEvents: Event[] = [
      {
        id: 1,
        title: 'Tech Conference 2024',
        description: 'Join us for the biggest tech conference of the year featuring industry leaders and innovative discussions.',
        category: 'Technology',
        date: '2024-03-15',
        time: '09:00',
        location: 'San Francisco Convention Center',
        imageUrl: 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
        totalSeats: 500,
        availableSeats: 350,
        priceTiers: [
          { id: 1, name: 'General', price: 299, description: 'General admission', available: 200, total: 300 },
          { id: 2, name: 'VIP', price: 599, description: 'VIP access with networking', available: 50, total: 100 },
          { id: 3, name: 'Premium', price: 899, description: 'Premium with exclusive content', available: 25, total: 100 }
        ],
        organizer: 'Tech Events Inc.',
        featured: true
      },
      {
        id: 2,
        title: 'Music Festival Summer',
        description: 'Experience the best music festival with top artists from around the world.',
        category: 'Music',
        date: '2024-04-20',
        time: '15:00',
        location: 'Central Park, New York',
        imageUrl: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
        totalSeats: 1000,
        availableSeats: 750,
        priceTiers: [
          { id: 4, name: 'General', price: 149, description: 'General admission', available: 600, total: 800 },
          { id: 5, name: 'VIP', price: 299, description: 'VIP area access', available: 150, total: 200 }
        ],
        organizer: 'Music Events Co.',
        featured: true
      },
      {
        id: 3,
        title: 'Art Gallery Opening',
        description: 'Exclusive opening of contemporary art gallery featuring emerging artists.',
        category: 'Art',
        date: '2024-03-25',
        time: '18:00',
        location: 'Modern Art Museum, Chicago',
        imageUrl: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800',
        totalSeats: 150,
        availableSeats: 100,
        priceTiers: [
          { id: 6, name: 'Standard', price: 75, description: 'Standard admission', available: 100, total: 150 }
        ],
        organizer: 'Art Collective',
        featured: false
      },
      {
        id: 4,
        title: 'Business Summit 2024',
        description: 'Network with industry leaders and learn about the latest business trends.',
        category: 'Business',
        date: '2024-04-10',
        time: '08:30',
        location: 'Business Center, Los Angeles',
        imageUrl: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=800',
        totalSeats: 300,
        availableSeats: 200,
        priceTiers: [
          { id: 7, name: 'Professional', price: 399, description: 'Professional networking', available: 150, total: 200 },
          { id: 8, name: 'Executive', price: 799, description: 'Executive level access', available: 50, total: 100 }
        ],
        organizer: 'Business Leaders Inc.',
        featured: true
      }
    ];

    setEvents(demoEvents);
    setLoading(false);
  }, []);

  const createBooking = async (eventId: number, ticketType: string, quantity: number, customerName: string, customerEmail: string): Promise<boolean> => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) return false;

      const tier = event.priceTiers.find(t => t.name === ticketType);
      if (!tier || tier.available < quantity) return false;

      const newBooking: Booking = {
        id: Date.now(),
        userId: 1, // This would come from auth context
        eventId,
        event,
        ticketType,
        quantity,
        totalPrice: tier.price * quantity,
        status: 'confirmed',
        bookingDate: format(new Date(), 'yyyy-MM-dd'),
        qrCode: `QR-${Date.now()}`,
        customerName,
        customerEmail
      };

      setBookings(prev => [...prev, newBooking]);
      
      // Update available seats
      setEvents(prev => prev.map(e => 
        e.id === eventId 
          ? {
              ...e,
              availableSeats: e.availableSeats - quantity,
              priceTiers: e.priceTiers.map(t => 
                t.name === ticketType 
                  ? { ...t, available: t.available - quantity }
                  : t
              )
            }
          : e
      ));

      return true;
    } catch (error) {
      return false;
    }
  };

  const cancelBooking = async (bookingId: number): Promise<boolean> => {
    try {
      const booking = bookings.find(b => b.id === bookingId);
      if (!booking) return false;

      setBookings(prev => prev.map(b => 
        b.id === bookingId 
          ? { ...b, status: 'cancelled' as const }
          : b
      ));

      // Restore available seats
      setEvents(prev => prev.map(e => 
        e.id === booking.eventId 
          ? {
              ...e,
              availableSeats: e.availableSeats + booking.quantity,
              priceTiers: e.priceTiers.map(t => 
                t.name === booking.ticketType 
                  ? { ...t, available: t.available + booking.quantity }
                  : t
              )
            }
          : e
      ));

      return true;
    } catch (error) {
      return false;
    }
  };

  const createEvent = async (eventData: Partial<Event>): Promise<boolean> => {
    try {
      const newEvent: Event = {
        id: Date.now(),
        title: eventData.title || '',
        description: eventData.description || '',
        category: eventData.category || '',
        date: eventData.date || '',
        time: eventData.time || '',
        location: eventData.location || '',
        imageUrl: eventData.imageUrl || 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=800',
        totalSeats: eventData.totalSeats || 0,
        availableSeats: eventData.availableSeats || eventData.totalSeats || 0,
        priceTiers: eventData.priceTiers || [],
        organizer: eventData.organizer || '',
        featured: eventData.featured || false
      };

      setEvents(prev => [...prev, newEvent]);
      return true;
    } catch (error) {
      return false;
    }
  };

  const updateEvent = async (eventId: number, eventData: Partial<Event>): Promise<boolean> => {
    try {
      setEvents(prev => prev.map(e => 
        e.id === eventId 
          ? { ...e, ...eventData }
          : e
      ));
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteEvent = async (eventId: number): Promise<boolean> => {
    try {
      setEvents(prev => prev.filter(e => e.id !== eventId));
      return true;
    } catch (error) {
      return false;
    }
  };

  const getEventById = (id: number): Event | undefined => {
    return events.find(e => e.id === id);
  };

  const getBookingsByUserId = (userId: number): Booking[] => {
    return bookings.filter(b => b.userId === userId);
  };

  const searchEvents = (query: string, category?: string, date?: string): Event[] => {
    return events.filter(event => {
      const matchesQuery = event.title.toLowerCase().includes(query.toLowerCase()) ||
                          event.description.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = !category || event.category === category;
      const matchesDate = !date || event.date === date;
      
      return matchesQuery && matchesCategory && matchesDate;
    });
  };

  const stats: BookingStats = {
    totalEvents: events.length,
    totalBookings: bookings.length,
    totalRevenue: bookings.reduce((sum, b) => sum + b.totalPrice, 0),
    thisMonthBookings: bookings.filter(b => b.bookingDate.includes('2024-03')).length,
    thisMonthRevenue: bookings.filter(b => b.bookingDate.includes('2024-03')).reduce((sum, b) => sum + b.totalPrice, 0),
    popularEvents: events.filter(e => e.featured).slice(0, 3)
  };

  const value = {
    events,
    bookings,
    stats,
    createBooking,
    cancelBooking,
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getBookingsByUserId,
    searchEvents,
    loading
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};