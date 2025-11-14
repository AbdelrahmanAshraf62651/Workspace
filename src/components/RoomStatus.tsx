import { Card, Table, Badge } from "react-bootstrap";
import type { Room } from '../types';


const renderStatus = (status : string) => {
  if (status === "Occupied") {
    return <Badge bg="danger">Occupied</Badge>;
  }
  return status;
};

const RoomStatusTable = (Props: { rooms: Room[] }) => {
  const rooms = Props.rooms;
  return (
    <Card className="shadow border-0 rounded-3 w-100">
      <Card.Body>
        <Card.Title as="h2" className="mb-4">
          Current Room Status
        </Card.Title>

        <Table responsive hover className="align-middle">
          <thead style={{ backgroundColor: "#f8f9fa" }}>
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
      </Card.Body>
    </Card>
  );
};

export default RoomStatusTable;
