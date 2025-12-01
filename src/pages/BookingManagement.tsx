import { useState, useEffect } from 'react';
import {
  Button,
  Badge,
  Table,
  Alert,
  Col,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface Room {
  id: string;
  user_name: string;
  room_name: string;
  start_time: string;
  end_time: string;
  status: 'cancelled' | 'pending' | 'confirmed';
  cost: number;
}

function BookingManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking')
      .then((response) => {
        setRooms(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      })
      .finally(() => setLoading(false));
  }, []);
  // Success/Error Messages
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(
    null
  );
  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  };

  // add/edit functionality removed — bookings are read and managed via API

  // add/edit API helpers removed — booking management is read/update/delete only

  const deleteRoom = async (id: string) => {
    await axios.delete(
      `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking/${id}`
    );
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const toggleRoomStatus = async (id: string, currentStatus: string) => {
    const statusMap: { [key: string]: string } = {
      confirmed: 'pending',
      pending: 'cancelled',
      cancelled: 'confirmed',
    };
    const newStatus = statusMap[currentStatus] || 'confirmed';
    try {
      const response = await axios.put(
        `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking/${id}`,
        { status: newStatus }
      );
      setRooms(rooms.map((r) => (r.id === id ? response.data : r)));
      showMessage('Status updated', 'success');
    } catch (error) {
      console.error('Error updating status:', error);
      showMessage('Failed to update status', 'error');
    }
  };

  const handleDeleteRoom = (id: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      deleteRoom(id);
      showMessage('Room deleted successfully!', 'success');
    }
  };

  const getStatusBadgeVariant = (status: Room['status']) => {
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

  // Format ISO date/time strings for display
  const formatDate = (iso?: string) => {
    if (!iso) return '-';
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso; // fallback to raw string if invalid
    return d.toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Booking History</h1>
          <p className="text-muted">
            Manage your booking rooms, their details, and availability status
          </p>
        </div>
        {/* Add Room removed per request */}
      </div>

      {/*  Success/Error Messages */}
      {message && (
        <Alert
          variant={messageType === 'success' ? 'success' : 'danger'}
          dismissible
          onClose={() => {
            setMessage(null);
            setMessageType(null);
          }}
        >
          {message}
        </Alert>
      )}

      {/* Statistics */}
      <div className="shadow-sm mb-4">
        <div className="p-4 bg-white rounded-top">
          <div className="align-items-center row">
            <div className="col-md-6">
              <div className="d-flex align-items-center gap-4 flex-wrap">
                <div>
                  <span className="fw-semibold">Total Rooms:</span>
                  <Badge bg="primary" className="ms-2">
                    {rooms.length}
                  </Badge>
                </div>
                <div>
                  <span className="fw-semibold">Confirmed:</span>
                  <Badge bg="success" className="ms-2">
                    {rooms.filter((r) => r.status === 'confirmed').length}
                  </Badge>
                </div>
                <div>
                  <span className="fw-semibold">Cancelled:</span>
                  <Badge bg="danger" className="ms-2">
                    {rooms.filter((r) => r.status === 'cancelled').length}
                  </Badge>
                </div>
                <div>
                  <span className="fw-semibold">Pending:</span>
                  <Badge bg="warning" className="ms-2 text-dark">
                    {rooms.filter((r) => r.status === 'pending').length}
                  </Badge>
                </div>
              </div>
            </div>
            <Col md={6}>
              <div className="d-flex justify-content-end gap-2"></div>
            </Col>
          </div>
        </div>
      </div>

      {/* Rooms Table */}
      <div className="shadow-sm">
        <div className="p-0">
          <div className="table-responsive">
            <Table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  <th>Room</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Cost</th>
                  <th>Status</th>
                  <th style={{ width: '150px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7}>
                      <div className="d-flex justify-content-center py-5">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : rooms.length > 0 ? (
                  rooms.map((room) => (
                    <tr key={room.id}>
                      <td>
                        <strong>{room.user_name}</strong>
                      </td>
                      <td>
                        <strong>{room.room_name}</strong>
                      </td>
                      <td>
                        <strong>{formatDate(room.start_time)}</strong>
                      </td>
                      <td>
                        <strong>{formatDate(room.end_time)}</strong>
                      </td>
                      <td>
                        <strong>${room.cost}</strong>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <p
                            className={`rounded-pill px-2 small text-center fw-semibold bg-${getStatusBadgeVariant(
                              room.status
                            )} mb-0`}
                          >
                            {room.status}
                          </p>
                        </div>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() =>
                              toggleRoomStatus(room.id, room.status)
                            }
                            title="Toggle Status"
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteRoom(room.id)}
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center py-5">
                      <div className="text-muted">
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="me-2"
                          size="3x"
                        />
                        <div className="mt-3">No bookings found</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Add/Edit UI removed */}
    </div>
  );
}

export default BookingManagement;
