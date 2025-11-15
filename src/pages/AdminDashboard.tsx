import {
  faCalendar,
  faHospital,
  faTable,
  faUserAlt,
} from '@fortawesome/free-solid-svg-icons';
import RoomStatusTable from '../components/RoomStatus';
import type { Room } from '../types';
import DailyBooking from '../components/DailyBooking';
import RecentActivity from '../components/RecentActivity';
import DashboardCard from '../components/DashboardCard';

function AdminDashboard() {
  const roomsData: Room[] = [
    {
      id: 1,
      name: 'Meeting Room A',
      capacity: 8,
      status: 'Available',
      nextEvent: 'None',
    },
    {
      id: 2,
      name: 'Small Conference',
      capacity: 4,
      status: 'Occupied',
      nextEvent: 'Until 3:00 PM',
    },
    {
      id: 3,
      name: 'Quiet Booth 1',
      capacity: 1,
      status: 'Maintenance',
      nextEvent: 'End of Day',
    },
    {
      id: 4,
      name: 'Creative Studio',
      capacity: 12,
      status: 'Available',
      nextEvent: 'None',
    },
    {
      id: 5,
      name: 'Focus Pod 2',
      capacity: 1,
      status: 'Occupied',
      nextEvent: 'Until 1:30 PM',
    },
    {
      id: 6,
      name: 'Large Training Hall',
      capacity: 30,
      status: 'Available',
      nextEvent: 'Booked tomorrow',
    },
  ];

  const statCardsData = [
    { title: 'Total Bookings', value: 24, icon: faCalendar },
    { title: 'Available Rooms', value: 8, icon: faHospital },
    { title: 'Occupied Desks', value: 16, icon: faTable },
    { title: 'New Members', value: 4, icon: faUserAlt },
  ];

  return (
    <div className="container pt-5 admin-dashboard-page">
      <h1 className="fw-bold">Admin Dashboard</h1>
      <div className="row g-4 pt-4">
        {statCardsData.map((card) => (
          <div key={card.title} className="col-12 col-sm-6 col-lg-3">
            <DashboardCard {...card} />
          </div>
        ))}
        <div className="col-12 col-lg-6 ">
          <RoomStatusTable rooms={roomsData} />
        </div>
        <div className="col-12 col-lg-6">
          <DailyBooking />
        </div>
      </div>
      <RecentActivity />
      <div className="d-flex flex-row gap-3 mt-3">
        <button className="btn sec-btn">Add New Room</button>
        <button className="btn main-btn">View All Bookings</button>
      </div>
    </div>
  );
}

export default AdminDashboard;
