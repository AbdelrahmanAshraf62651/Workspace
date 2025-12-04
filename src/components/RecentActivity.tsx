import { Table } from 'react-bootstrap';
import type { Booking } from '../types';

interface RecentActivityProps {
  bookings: Booking[];
  loading: boolean;
}

const RecentActivity = ({ bookings, loading }: RecentActivityProps) => {
  const formatDate = (iso?: string) => {
    if (!iso) return '-';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadgeVariant = (status: Booking['status']) => {
    switch (status) {
      case 'confirmed':
        return 'success text-white';
      case 'pending':
        return 'warning text-dark';
      case 'cancelled':
        return 'danger text-white';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="mt-5">
      <div>
        <h3 className="mb-4 fw-semibold">Recent Bookings</h3>
        <Table
          responsive
          hover
          className="align-middle"
          style={{ minWidth: '700px' }}
        >
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th className="text-center">Room</th>
              <th className="text-center">Start Time</th>
              <th className="text-center">End Time</th>
              <th className="text-center">Cost</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-5">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </td>
              </tr>
            ) : bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="text-center">{booking.room_name}</td>
                  <td className="text-center">
                    {formatDate(booking.start_time)}
                  </td>
                  <td className="text-center">{formatDate(booking.end_time)}</td>
                  <td className="text-center">${booking.cost}</td>
                  <td className="text-center">
                    <div className="d-flex align-items-center justify-content-center">
                      <p
                        className={`rounded-pill px-2 small text-center fw-semibold bg-${getStatusBadgeVariant(
                          booking.status
                        )} mb-0`}
                      >
                        {booking.status}
                      </p>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-5">
                  No recent bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default RecentActivity;
