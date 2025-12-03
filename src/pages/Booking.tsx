import { useState, useEffect, useMemo } from 'react';
import BookingCard from '../components/BookingCard';
import axios from 'axios';

interface Room {
  id: string;
  title: string;
  name: string;
  description: string;
  img: string;
  room_description: string;
  capacity: number;
  hourly_rate: number;
  currency: string;
  image: string;
  isAvailableNow?: boolean;
  price?: number;
}

interface Booking {
  id: string;
  room_name: string;
  start_time: string;
  end_time: string;
  status: 'cancelled' | 'pending' | 'confirmed';
}

function Booking() {
  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [userId, setUserId] = useState<number | null>(null);

  const fetchBookings = () => {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking')
      .then((response) => setBookings(response.data))
      .catch((error) => console.error('Error fetching bookings data:', error));
  };

  useEffect(() => {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/room')
      .then((response) => {
        const transformedData = response.data.map((room: Room) => ({
          ...room,
          img: room.image,
          price: room.hourly_rate,
        }));
        setRoomsData(transformedData);
      })
      .catch((error) => console.error('Error fetching rooms data:', error));

    fetchBookings();

    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedHour, setSelectedHour] = useState<number>(9);
  const [duration, setDuration] = useState<number>(1);

  const formatHourString = (h: number) => {
    const hour = h % 24;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${ampm}`;
  };

  const availableHours = useMemo(() => {
    return Array.from({ length: 13 }, (_, i) => 9 + i); // 9 AM to 9 PM
  }, []);

  const filteredRooms = useMemo(() => {
    return roomsData.map((room) => {
      const [year, month, day] = selectedDate.split('-').map(Number);

      const desiredStartTime = new Date(year, month - 1, day, selectedHour);
      const desiredEndTime = new Date(
        year,
        month - 1,
        day,
        selectedHour + duration
      );

      const isAvailable = !bookings.some((booking) => {
        if (booking.room_name !== room.name || booking.status === 'cancelled') {
          return false;
        }

        const bookingStart = new Date(Number(booking.start_time));
        const bookingEnd = new Date(Number(booking.end_time));

        return desiredStartTime < bookingEnd && desiredEndTime > bookingStart;
      });

      return { ...room, isAvailableNow: isAvailable };
    });
  }, [roomsData, bookings, selectedDate, selectedHour, duration]);

  const handleBooking = async (roomName: string, cost: number) => {
    if (!userId) {
      alert('You must be logged in to book a room.');
      return;
    }

    const [year, month, day] = selectedDate.split('-').map(Number);
    const startTime = new Date(year, month - 1, day, selectedHour);
    const endTime = new Date(year, month - 1, day, selectedHour + duration);
    const bookingData = {
      room_name: roomName,
      start_time: startTime.getTime().toString(),
      end_time: endTime.getTime().toString(),
      status: 'pending',
      user_id: userId,
      cost: cost,
    };

    axios
      .post(
        'https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking',
        bookingData
      )
      .then((response) => {
        console.log('Booking request sent:', response.data);
        fetchBookings();
      })
      .catch((error) => {
        console.error('Error booking room:', error);
        alert('Booking failed. Please try again.');
      });
  };

  const minDate = new Date().toISOString().split('T')[0];

  return (
    <div className="container pt-5">
      <h1 className="fw-bolder mb-4">Book Your Workspace</h1>
      <p className="text-muted mb-4">
        Select your desired date and time to see available workspaces.
      </p>

      <div className="row mb-5 g-3">
        <div className="col-md-4">
          <label className="form-label fw-semibold">Select Date</label>
          <input
            type="date"
            className="form-control form-control-lg"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={minDate}
          />
        </div>

        <div className="col-md-4">
          <label className="form-label fw-semibold">Start Time</label>
          <select
            className="form-select form-select-lg"
            value={selectedHour}
            onChange={(e) => setSelectedHour(Number(e.target.value))}
          >
            {availableHours.map((hour) => (
              <option key={hour} value={hour}>
                {formatHourString(hour)}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label fw-semibold">Duration</label>
          <select
            className="form-select form-select-lg"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            {[1, 2, 3, 4].map((h) => (
              <option key={h} value={h}>
                {h} hour{h > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="alert alert-dark mb-4">
        <strong>Showing availability for:</strong>{' '}
        {new Date(selectedDate).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}{' '}
        at {selectedHour}:00 - {selectedHour + duration}:00
      </div>

      <div className="row g-4">
        {filteredRooms.map((item) => (
          <BookingCard
            {...item}
            key={item.id}
            isAvailable={item.isAvailableNow}
            duration={duration}
            onBook={() =>
              handleBooking(item.name, (item.price || 0) * duration)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Booking;
