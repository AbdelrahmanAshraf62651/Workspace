import { useState, useMemo } from 'react';
import BookingCard from '../components/BookingCard';

interface Room {
  id: string;
  title: string;
  description: string;
  img: string;
  capacity: number;
  price: number;
  currency: string;
}

interface Availability {
  roomId: string;
  date: string;
  hour: number;
  available: boolean;
}

const roomsData: Room[] = [
  {
    id: 'single-seat',
    title: 'Single Seat',
    description: 'Dedicated space for individual focus and productivity.',
    img: '/images/booking/img1.png',
    capacity: 1,
    price: 10,
    currency: 'USD',
  },
  {
    id: 'private-room',
    title: 'Private Room',
    description: 'Fully equipped room for team meetings and private sessions.',
    img: '/images/booking/img2.png',
    capacity: 4,
    price: 25,
    currency: 'USD',
  },
  {
    id: 'conference-hall',
    title: 'Conference Hall',
    description: 'Spacious hall for large gatherings and presentations.',
    img: '/images/booking/img3.jpg',
    capacity: 20,
    price: 50,
    currency: 'USD',
  },
];

// Fake availability data for testing
const fakeAvailabilityData: Availability[] = [
  // Single Seat availability
  { roomId: 'single-seat', date: '2025-12-01', hour: 9, available: true },
  { roomId: 'single-seat', date: '2025-12-01', hour: 10, available: false },
  { roomId: 'single-seat', date: '2025-12-01', hour: 11, available: true },
  { roomId: 'single-seat', date: '2025-12-01', hour: 12, available: true },
  { roomId: 'single-seat', date: '2025-12-01', hour: 13, available: false },
  { roomId: 'single-seat', date: '2025-12-01', hour: 14, available: true },
  { roomId: 'single-seat', date: '2025-12-01', hour: 15, available: true },
  { roomId: 'single-seat', date: '2025-12-01', hour: 16, available: false },
  { roomId: 'single-seat', date: '2025-12-01', hour: 17, available: true },
  
  { roomId: 'single-seat', date: '2025-12-02', hour: 9, available: false },
  { roomId: 'single-seat', date: '2025-12-02', hour: 10, available: true },
  { roomId: 'single-seat', date: '2025-12-02', hour: 11, available: true },
  { roomId: 'single-seat', date: '2025-12-02', hour: 12, available: true },
  { roomId: 'single-seat', date: '2025-12-02', hour: 13, available: true },
  { roomId: 'single-seat', date: '2025-12-02', hour: 14, available: false },
  { roomId: 'single-seat', date: '2025-12-02', hour: 15, available: true },
  { roomId: 'single-seat', date: '2025-12-02', hour: 16, available: true },
  { roomId: 'single-seat', date: '2025-12-02', hour: 17, available: true },

  // Private Room availability
  { roomId: 'private-room', date: '2025-12-01', hour: 9, available: true },
  { roomId: 'private-room', date: '2025-12-01', hour: 10, available: true },
  { roomId: 'private-room', date: '2025-12-01', hour: 11, available: false },
  { roomId: 'private-room', date: '2025-12-01', hour: 12, available: false },
  { roomId: 'private-room', date: '2025-12-01', hour: 13, available: true },
  { roomId: 'private-room', date: '2025-12-01', hour: 14, available: true },
  { roomId: 'private-room', date: '2025-12-01', hour: 15, available: false },
  { roomId: 'private-room', date: '2025-12-01', hour: 16, available: true },
  { roomId: 'private-room', date: '2025-12-01', hour: 17, available: true },

  { roomId: 'private-room', date: '2025-12-02', hour: 9, available: true },
  { roomId: 'private-room', date: '2025-12-02', hour: 10, available: false },
  { roomId: 'private-room', date: '2025-12-02', hour: 11, available: true },
  { roomId: 'private-room', date: '2025-12-02', hour: 12, available: true },
  { roomId: 'private-room', date: '2025-12-02', hour: 13, available: false },
  { roomId: 'private-room', date: '2025-12-02', hour: 14, available: true },
  { roomId: 'private-room', date: '2025-12-02', hour: 15, available: true },
  { roomId: 'private-room', date: '2025-12-02', hour: 16, available: false },
  { roomId: 'private-room', date: '2025-12-02', hour: 17, available: true },

  // Conference Hall availability
  { roomId: 'conference-hall', date: '2025-12-01', hour: 9, available: false },
  { roomId: 'conference-hall', date: '2025-12-01', hour: 10, available: true },
  { roomId: 'conference-hall', date: '2025-12-01', hour: 11, available: true },
  { roomId: 'conference-hall', date: '2025-12-01', hour: 12, available: true },
  { roomId: 'conference-hall', date: '2025-12-01', hour: 13, available: false },
  { roomId: 'conference-hall', date: '2025-12-01', hour: 14, available: false },
  { roomId: 'conference-hall', date: '2025-12-01', hour: 15, available: true },
  { roomId: 'conference-hall', date: '2025-12-01', hour: 16, available: true },
  { roomId: 'conference-hall', date: '2025-12-01', hour: 17, available: true },

  { roomId: 'conference-hall', date: '2025-12-02', hour: 9, available: true },
  { roomId: 'conference-hall', date: '2025-12-02', hour: 10, available: true },
  { roomId: 'conference-hall', date: '2025-12-02', hour: 11, available: false },
  { roomId: 'conference-hall', date: '2025-12-02', hour: 12, available: true },
  { roomId: 'conference-hall', date: '2025-12-02', hour: 13, available: true },
  { roomId: 'conference-hall', date: '2025-12-02', hour: 14, available: true },
  { roomId: 'conference-hall', date: '2025-12-02', hour: 15, available: false },
  { roomId: 'conference-hall', date: '2025-12-02', hour: 16, available: true },
  { roomId: 'conference-hall', date: '2025-12-02', hour: 17, available: true },
];

function Booking() {
  const [selectedDate, setSelectedDate] = useState<string>('2025-12-01');
  const [selectedHour, setSelectedHour] = useState<number>(9);

  // Get available hours for selected date
  const availableHours = useMemo(() => {
    return Array.from({ length: 9 }, (_, i) => 9 + i); // 9 AM to 5 PM
  }, []);

  // Get filtered rooms based on availability
  const filteredRooms = useMemo(() => {
    return roomsData.map((room) => {
      const isAvailable = fakeAvailabilityData.some(
        (slot) =>
          slot.roomId === room.id &&
          slot.date === selectedDate &&
          slot.hour === selectedHour &&
          slot.available
      );
      return { ...room, isAvailableNow: isAvailable };
    });
  }, [selectedDate, selectedHour]);

  // Get the minimum date (today)
  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="container pt-5">
      <h1 className="fw-bolder mb-4">Book Your Workspace</h1>

      {/* Date and Time Selectors */}
      <div className="row mb-5 g-3">
        <div className="col-md-6">
          <label htmlFor="dateSelector" className="form-label fw-semibold">
            📅 Select Date
          </label>
          <input
            type="date"
            id="dateSelector"
            className="form-control form-control-lg"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={minDate}
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="timeSelector" className="form-label fw-semibold">
            🕒 Select Time
          </label>
          <select
            id="timeSelector"
            className="form-select form-select-lg"
            value={selectedHour}
            onChange={(e) => setSelectedHour(Number(e.target.value))}
          >
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>
                {hour}:00 - {hour + 1}:00 ({hour < 12 ? 'AM' : hour === 12 ? 'PM' : hour - 12 + (hour === 23 ? '' : ' PM')})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Availability Info */}
      <div className="alert alert-info mb-4">
        <strong>📍 Showing availability for:</strong> {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {selectedHour}:00 - {selectedHour + 1}:00
      </div>

      {/* Rooms Grid */}
      <div className="row g-4">
        {filteredRooms.map((item) => (
          <BookingCard
            {...item}
            key={item.id}
            isAvailable={item.isAvailableNow}
            selectedDate={selectedDate}
            selectedHour={selectedHour}
          />
        ))}
        <div className="box col-12 col-md-6 col-lg-4">
          <div
            className="card d-flex justify-content-center align-items-center h-100 coming-soon shadow-sm"
            style={{
              backgroundColor: '#F3F4F6FF',
              fontFamily: 'Source Sans 3", sans-serif',
            }}
          >
            <div
              className="loading-icon mb-3"
              style={{
                padding: '1.1rem',
                border: 'black dashed 5px',
                opacity: '0.5',
                borderRadius: '50%',
              }}
            ></div>
            More options coming soon!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
