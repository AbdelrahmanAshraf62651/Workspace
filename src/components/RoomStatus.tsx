import { Table } from 'react-bootstrap';
import type { Room } from '../types';

const renderStatus = (status: string) => {
  if (status === 'Available') {
    return (
      <span className={`badge rounded-pill text-bg-success`}>{status} </span>
    );
  }
  else if (status === 'Occupied') {
    return (
      <span className={`badge rounded-pill text-bg-danger`}>{status}</span>
    );
  }
  return <span className={`badge rounded-pill text-bg-warning`}>{status}</span>;
};

const RoomStatusTable = (Props: { rooms: Room[] }) => {
  const rooms = Props.rooms;
  return (
    <div className="border border-1 border-dark border-opacity-25 p-4 rounded-2 w-100">
      <h3 className="mb-4">Current Room Status</h3>
      <Table responsive hover className="align-middle">
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th>Room Name</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Next Event</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room: Room) => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>{room.capacity}</td>
              <td>{renderStatus(room.status)}</td>
              <td>{room.nextEvent}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RoomStatusTable;
