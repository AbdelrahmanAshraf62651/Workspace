import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles.css';

interface AccessEvent {
  timestamp: string;
  userName: string;
  roomId: string;
  eventType: 'Entry' | 'Exit';
  status: 'Success' | 'Failed' | 'Pending';
}

const initialData: AccessEvent[] = [
  {
    timestamp: '2024-03-10 09:00:00',
    userName: 'Alice Johnson',
    roomId: 'MR-101',
    eventType: 'Entry',
    status: 'Success',
  },
  {
    timestamp: '2024-03-10 09:05:00',
    userName: 'Bob Smith',
    roomId: 'Hot Desk 5',
    eventType: 'Entry',
    status: 'Success',
  },
  {
    timestamp: '2024-03-10 09:15:00',
    userName: 'Charlie Brown',
    roomId: 'CR-203',
    eventType: 'Entry',
    status: 'Success',
  },
  {
    timestamp: '2024-03-10 11:30:00',
    userName: 'Alice Johnson',
    roomId: 'MR-101',
    eventType: 'Exit',
    status: 'Success',
  },
  {
    timestamp: '2024-03-10 11:45:00',
    userName: 'David Lee',
    roomId: 'SR-305',
    eventType: 'Entry',
    status: 'Failed',
  },
  {
    timestamp: '2024-03-10 13:00:00',
    userName: 'Emily Davis',
    roomId: 'HR-401',
    eventType: 'Entry',
    status: 'Success',
  },
  {
    timestamp: '2024-03-11 08:30:00',
    userName: 'Frank White',
    roomId: 'MR-101',
    eventType: 'Entry',
    status: 'Success',
  },
  {
    timestamp: '2024-03-11 10:00:00',
    userName: 'Grace Hall',
    roomId: 'Hot Desk 10',
    eventType: 'Entry',
    status: 'Pending',
  },
  {
    timestamp: '2024-03-11 14:00:00',
    userName: 'Bob Smith',
    roomId: 'Hot Desk 5',
    eventType: 'Exit',
    status: 'Success',
  },
  {
    timestamp: '2024-03-12 09:45:00',
    userName: 'Alice Johnson',
    roomId: 'CR-203',
    eventType: 'Entry',
    status: 'Success',
  },
];

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Success':
      return 'bg-success ';
    case 'Failed':
      return 'bg-danger';
    case 'Pending':
      return 'bg-warning text-dark';
    default:
      return 'bg-secondary text-white';
  }
};

function AccessHistory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [filteredData, setFilteredData] = useState<AccessEvent[]>(initialData);

  const uniqueUsers = Array.from(
    new Set(initialData.map((item) => item.userName))
  ).sort();
  const uniqueRooms = Array.from(
    new Set(initialData.map((item) => item.roomId))
  ).sort();

  const handleApplyFilters = () => {
    let filtered = [...initialData];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.roomId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.timestamp.includes(searchTerm)
      );
    }

    if (selectedUser) {
      filtered = filtered.filter((item) => item.userName === selectedUser);
    }

    if (selectedRoom) {
      filtered = filtered.filter((item) => item.roomId === selectedRoom);
    }

    if (dateRange) {
      const [startDate, endDate] = dateRange.split(' - ');
      if (startDate && endDate) {
        filtered = filtered.filter((item) => {
          const itemDate = item.timestamp.split(' ')[0];
          return itemDate >= startDate && itemDate <= endDate;
        });
      }
    }

    setFilteredData(filtered);
  };

  const handleReset = () => {
    setSearchTerm('');
    setSelectedUser('');
    setSelectedRoom('');
    setDateRange('');
    setFilteredData(initialData);
  };

  return (
    <div className="container pt-5">
      <h1 className="fw-bolder mb-4">Access History Log</h1>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-lg-3">
          <div className="position-relative">
            <FontAwesomeIcon
              icon={faSearch}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
              style={{ zIndex: 10 }}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-2">
          <div className="position-relative">
            <select
              className="form-select pe-4"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <option value="">Filter by User</option>
              {uniqueUsers.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-2">
          <div className="position-relative">
            <select
              className="form-select pe-4"
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
            >
              <option value="">Filter by Room</option>
              {uniqueRooms.map((room) => (
                <option key={room} value={room}>
                  {room}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-3">
          <div className="position-relative">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-secondary"
              style={{ zIndex: 10 }}
            />
            <input
              type="text"
              className="form-control ps-5"
              placeholder="Pick a date range"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              onFocus={(e) => (e.target.type = 'date')}
            />
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-2 d-flex gap-2">
          <button
            className="btn sec-btn flex-grow-1"
            onClick={handleApplyFilters}
          >
            Apply
          </button>
          <button
            className="btn main-btn"
            onClick={handleReset}
            style={{ whiteSpace: 'nowrap' }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="fw-bold mb-3">Recent Access Events</h4>
        <div className="p-4 shadow-sm">
          <div className="table-responsive">
            <table
              className="table table-striped align-middle"
              style={{ minWidth: '600px' }}
            >
              <thead>
                <tr>
                  <th scope="col" className="fw-semibold">
                    Timestamp
                  </th>
                  <th scope="col" className="fw-semibold">
                    User Name
                  </th>
                  <th scope="col" className="fw-semibold">
                    Room ID
                  </th>
                  <th scope="col" className="fw-semibold">
                    Event Type
                  </th>
                  <th scope="col" className="fw-semibold">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((event, index) => (
                  <tr key={index}>
                    <td>{event.timestamp}</td>
                    <td>{event.userName}</td>
                    <td>{event.roomId}</td>
                    <td>{event.eventType}</td>
                    <td>
                      <span
                        className={`badge rounded-pill ${getStatusBadgeClass(
                          event.status
                        )}`}
                      >
                        {event.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessHistory;
