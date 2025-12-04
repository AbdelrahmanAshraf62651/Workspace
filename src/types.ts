export interface Room {
  id: string;
  name: string;
  type: string;
  room_description: string;
  capacity: number;
  hourly_rate: number;
  image: string;
  status: 'unavailable' | 'available';
}

export interface Booking {
  id: string;
  room_name: string;
  start_time: string;
  end_time: string;
  status: 'cancelled' | 'pending' | 'confirmed';
  cost: number;
  user_id?: string;
}

export interface CafeItem {
  id: number;
  category: string;
  name: string;
  image: string;
  description: string;
  price: string;
  in_stock: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  role: 'admin' | 'customer';
}

export interface GalleryImage {
  id: number;
  image: string;
  title: string;
  description: string;
  isVisible: boolean;
}
