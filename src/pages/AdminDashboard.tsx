import {
  faCalendar,
  faHospital,
  faBowlFood,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import RoomStatusTable from '../components/RoomStatus';
import DailyBooking from '../components/DailyBooking';
import RecentActivity from '../components/RecentActivity';
import DashboardCard from '../components/DashboardCard';
import PieChart from '../components/PieChart';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Room, Booking, CafeItem, User, RoomAnalytics } from '../types';

function AdminDashboard() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomAnalytics, setRoomAnalytics] = useState<RoomAnalytics[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [cafeItems, setCafeItems] = useState<CafeItem[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [loadingRooms, setLoadingRooms] = useState(true);
  const [loadingRoomAnalytics, setLoadingRoomAnalytics] = useState(true);

  useEffect(() => {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/room')
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      })
      .finally(() => setLoadingRooms(false));

    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/room_analytics')
      .then((response) => {
        setRoomAnalytics(response.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      })
      .finally(() => setLoadingRoomAnalytics(false));

    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/user')
      .then((response) => {
        setUsers(response.data);
        console.log('users' + users);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/cafe_item')
      .then((response) => {
        setCafeItems(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cafe items:', error);
      });

    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking')
      .then((response) => {
        setBookings(response.data);
      })
      .catch((error) => {
        console.error('Error fetching bookings:', error);
      })
      .finally(() => setLoadingBookings(false));
  }, []);

  const roomNames = roomAnalytics.map((item) => item.name);
  const roomBookingCounts = roomAnalytics.map((item) => item.total_bookings);

  return (
    <div className="container pt-5 admin-dashboard-page">
      <h1 className="fw-bold">Admin Dashboard</h1>
      <div className="row g-4 pt-4">
        <div className="col-12 col-sm-6 col-lg-3">
          <DashboardCard
            {...{
              title: 'Total Bookings',
              value: bookings.length,
              icon: faCalendar,
            }}
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <DashboardCard
            {...{
              title: 'Total Rooms',
              value: rooms.filter((room) => room.status === 'available').length,
              icon: faHospital,
            }}
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <DashboardCard
            {...{
              title: 'Cafe Items',
              value: cafeItems.length,
              icon: faBowlFood,
            }}
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-3">
          <DashboardCard
            {...{
              title: 'Total Users',
              value: users.length,
              icon: faUserAlt,
            }}
          />
        </div>
        <div className="col-12 col-lg-6">
          <RoomStatusTable rooms={rooms.slice(0, 5)} loading={loadingRooms} />
        </div>
        <div className="col-12 col-lg-6">
          <h3 className=" mt-4 fw-semibold">Rooms Booking</h3>
          {loadingRoomAnalytics ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: '280px' }}
            >
              <div className="spinner-border text-dark" role="status"></div>
            </div>
          ) : (
            <PieChart labels={roomNames} values={roomBookingCounts} />
          )}
        </div>
        <div className="col-12">
          <DailyBooking />
        </div>
      </div>
      <RecentActivity
        bookings={bookings.slice(0, 5)}
        loading={loadingBookings}
      />

      <div className="d-flex flex-row gap-3 mt-3">
        <Link to="/edit-room-schedule" className="btn sec-btn">
          Add New Room
        </Link>
        <Link to="/booking-management" className="btn main-btn">
          View All Bookings
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
