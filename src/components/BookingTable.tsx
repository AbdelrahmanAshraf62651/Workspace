import React from 'react';

interface Booking {
  room: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Canceled';
  amount: string;
}

interface BookingTableProps {
  bookings: Booking[];
}

const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case 'Upcoming':
      return 'text-bg-warning';
    case 'Completed':
      return 'text-bg-success';
    case 'Canceled':
      return 'text-bg-danger';
    default:
      return 'text-bg-secondary';
  }
};

const BookingTable: React.FC<BookingTableProps> = ({ bookings }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Room</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr key={index}>
              <td>{booking.room}</td>
              <td>{booking.date}</td>
              <td>{booking.time}</td>
              <td>
                <span
                  className={`badge rounded-pill ${getStatusBadgeClass(
                    booking.status
                  )}`}
                >
                  {booking.status}
                </span>
              </td>
              <td>{booking.amount}</td>
              <td>
                <button className="btn btn-sm btn-outline-secondary">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable;
