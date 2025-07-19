export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  totalSeats: number;
  availableSeats: number;
  priceTiers: PriceTier[];
  organizer: string;
  featured: boolean;
}

export interface PriceTier {
  id: number;
  name: string;
  price: number;
  description: string;
  available: number;
  total: number;
}

export interface Booking {
  id: number;
  userId: number;
  eventId: number;
  event: Event;
  ticketType: string;
  quantity: number;
  totalPrice: number;
  status: 'confirmed' | 'cancelled' | 'pending';
  bookingDate: string;
  qrCode: string;
  customerName: string;
  customerEmail: string;
}

export interface BookingStats {
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  thisMonthBookings: number;
  thisMonthRevenue: number;
  popularEvents: Event[];
}