export type Room = {
  id: number;
  name: string;
  capacity: number;
  status: string;
  nextEvent: string;
};

export type GalleryImage = {
  id: number;
  img: string;
  title: string;
  description: string;
  isVisible: boolean;
};

export interface Booking {
  id: string;
  user_id: string;
  room_name: string;
  start_time: string;
  end_time: string;
  status: 'cancelled' | 'pending' | 'confirmed';
  cost: number;
}

export type DaySchedule = {
  isOpen: boolean;
  openTime: string;
  closeTime: string;

};

export type AboutSettings = {
  location: {
    address: string;
    city: string;
    country: string;
    mapLink: string;
  };
  openingHours: {
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
    saturday: DaySchedule;
    sunday: DaySchedule;
  };
  contact: {
    phone: string;
    email: string;
  };
};