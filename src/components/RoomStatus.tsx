import { Table } from 'react-bootstrap';
import type { Room } from '../types';

interface RoomStatusTableProps {
  rooms: Room[];
  loading: boolean;
}

const renderStatus = (status: string) => {
  if (status === 'available') {
    return (
      <span className={`badge rounded-pill text-bg-success`}>Available</span>
    );
  }
  return (
    <span className={`badge rounded-pill text-bg-danger`}>Unavailable</span>
  );
};

const RoomStatusTable = ({ rooms, loading }: RoomStatusTableProps) => {
  return (
    <div className="mt-4">
      <h3 className="mb-4 fw-semibold">Rooms Added Recently</h3>
        <Table responsive hover className="align-middle">
          <thead style={{ backgroundColor: '#f8f9fa' }}>
            <tr>
              <th className="text-center">Room</th>
              <th className="text-center">Type</th>
              <th className="text-center">Capacity</th>
              <th className="text-center">Hourly Rate</th>
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
            ) : rooms.length > 0 ? (
              rooms.map((room: Room) => (
                <tr key={room.id}>
                  <td className="text-center">{room.name}</td>
                  <td className="text-center">{room.type}</td>
                  <td className="text-center">{room.capacity}</td>
                  <td className="text-center">{room.hourly_rate} EGP</td>
                  <td className="text-center">{renderStatus(room.status)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-5">
                  No recent rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
    </div>
  );
};

export default RoomStatusTable;
