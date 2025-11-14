import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faHospital, faTable, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import RoomStatusTable from '../components/RoomStatus'
import type { Room } from '../types';
import DailyBooking from '../components/DailyBooking';
import RecentActivity from '../components/RecentActivity';
import {Card} from 'react-bootstrap';




function AdminDashboard() {

  const roomsData : Room[] = [
    { id: 1, name: 'Meeting Room A', capacity: 8, status: 'Available', nextEvent: 'None' },
    { id: 2, name: 'Small Conference', capacity: 4, status: 'Occupied', nextEvent: 'Until 3:00 PM' },
    { id: 3, name: 'Quiet Booth 1', capacity: 1, status: 'Maintenance', nextEvent: 'End of Day' },
    { id: 4, name: 'Creative Studio', capacity: 12, status: 'Available', nextEvent: 'None' },
    { id: 5, name: 'Focus Pod 2', capacity: 1, status: 'Occupied', nextEvent: 'Until 1:30 PM' },
    { id: 6, name: 'Large Training Hall', capacity: 30, status: 'Available', nextEvent: 'Booked tomorrow' },
  ];
  return (
    <div className='container pt-5 admin-dashboard-page'>
      <h2 className='fw-bold'>Admin Dashboard</h2>
      <div className="pt-4 d-flex justify-content-around align-items-center gap-1 ">
        <Card className="border border-1 border-dark border-opacity-25 p-4 rounded-2 w-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className='me-2'>Total Bookings</h4>
            <FontAwesomeIcon icon={faCalendar} style={{height: "20px"}} />
          </div>
          <span className='fs-2 fw-semibold'>24</span>
        </Card>
        <Card className="border border-1 border-dark border-opacity-25 p-4 rounded-2 w-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className='me-2'>Available Rooms</h4>
            <FontAwesomeIcon icon={faHospital} style={{height: "20px"}} />
          </div>
          <span className='fs-2 fw-semibold'>8</span>
        </Card>
        <Card className="border border-1 border-dark border-opacity-25 p-4 rounded-2 w-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className='me-2'>Occupied Desks</h4>
            <FontAwesomeIcon icon={faTable} style={{height: "20px"}} />
          </div>
          <span className='fs-2 fw-semibold'>16</span>
        </Card>
        <Card className="border border-1 border-dark border-opacity-25 p-4 rounded-2 w-100 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className='me-2'>New Members</h4>
            <FontAwesomeIcon icon={faUserAlt} style={{height: "20px"}} />
          </div>
          <span className='fs-2 fw-semibold'>4</span>
        </Card>
      </div>
      <div className="d-flex flex-column flex-lg-row gap-4 justify-content-between align-items-center w-100 py-4">
        <RoomStatusTable rooms={roomsData} />
        <DailyBooking />
      </div>
      <RecentActivity />
    </div>
  )
}

export default AdminDashboard