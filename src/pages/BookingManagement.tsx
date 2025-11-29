import { useState, useEffect, useMemo } from 'react';
import { Form, Button, Badge, Modal, Dropdown, Table, Alert, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faEdit, 
  faTrash, 
  faCheckCircle,
  faTimesCircle,
  faFilter,
  faSearch,
  faImage
}
from '@fortawesome/free-solid-svg-icons';
import { useRooms } from '../contexts/RoomsContext';


interface Room {
  id: string;
  name: string;
  title: string;
  type: string;
  description: string | null;
  image: string | null;
  capacity: number;
  hourlyRate: number;
  status: 'Available' | 'Booked' | 'Maintenance';
}

function BookingManagement() {
  const { rooms, addRoom, updateRoom, deleteRoom, toggleRoomStatus } = useRooms();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    type: '',
    description: '',
    image: '',
    capacity: 1,
    hourlyRate: 0,
  });
  
  // Filters
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  // Success/Error Messages
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null);

  //Filtering with useMemo
  const filteredRooms = useMemo(() => {
    return rooms.filter(room => {
      // Status filter
      if (filterStatus !== 'all' && room.status !== filterStatus) return false;
      
      // Search by name or title
      if (searchTerm && !room.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !room.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      
      // Type filter
      if (typeFilter !== 'all' && room.type !== typeFilter) return false;
      
      return true;
    });
  }, [rooms, filterStatus, searchTerm, typeFilter]);

  // Load editing room data
  useEffect(() => {
    if (editingRoom) {
      setFormData({
        name: editingRoom.name,
        title: editingRoom.title || '',
        type: editingRoom.type,
        description: editingRoom.description || '',
        image: editingRoom.image || '',
        capacity: editingRoom.capacity,
        hourlyRate: editingRoom.hourlyRate,
      });
    }
  }, [editingRoom]);

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      type: '',
      description: '',
      image: '',
      capacity: 1,
      hourlyRate: 0,
    });
    setEditingRoom(null);
  };

  //  Backend-ready add/update
  const handleAddRoom = async () => {
    try {
      const roomData = {
        name: formData.name,
        title: formData.title,
        type: formData.type,
        description: formData.description || null,
        image: formData.image || null,
        capacity: formData.capacity,
        hourlyRate: formData.hourlyRate,
      };

      if (editingRoom) {
        await updateRoom(editingRoom.id, roomData);
        showMessage('Room updated successfully!', 'success');
      } else {
        await addRoom(roomData);
        showMessage('Room added successfully!', 'success');
      }
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error('Error saving room:', error);
      showMessage('Error saving room. Please try again.', 'error');
    }
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setShowAddModal(true);
  };

  const handleDeleteRoom = (id: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      deleteRoom(id);
      showMessage('Room deleted successfully!', 'success');
    }
  };

  const getStatusBadgeVariant = (status: Room['status']) => {
    switch (status) {
      case 'Available': return 'success';
      case 'Booked': return 'danger';
      case 'Maintenance': return 'secondary';
      default: return 'secondary';
    }
  };

  //  Get unique room types for filter
  const availableTypes = useMemo(() => {
    const types = rooms.map(room => room.type);
    return Array.from(new Set(types)).sort();
  }, [rooms]);

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Booking Management</h1>
          <p className="text-muted">
            Manage your booking rooms, their details, and availability status
          </p>
        </div>
        <Button 
          variant="primary" 
          onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}
          className="sec-btn"
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add Room
        </Button>
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
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center gap-4 flex-wrap">
                <div>
                  <span className="fw-semibold">Total Rooms:</span>
                  <Badge bg="primary" className="ms-2">{rooms.length}</Badge>
                </div>
                <div>
                  <span className="fw-semibold">Available:</span>
                  <Badge bg="success" className="ms-2">
                    {rooms.filter(r => r.status === 'Available').length}
                  </Badge>
                </div>
                <div>
                  <span className="fw-semibold">Booked:</span>
                  <Badge bg="danger" className="ms-2">
                    {rooms.filter(r => r.status === 'Booked').length}
                  </Badge>
                </div>
                <div>
                  <span className="fw-semibold">Maintenance:</span>
                  <Badge bg="secondary" className="ms-2">
                    {rooms.filter(r => r.status === 'Maintenance').length}
                  </Badge>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-end gap-2">
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Filters */}
 
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3">
            {/* Status Filter */}
            <Col md={4}>
              <Form.Label className="fw-semibold">Filter by Status</Form.Label>
              <Form.Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as string)}
                className="w-100"
              >
                <option value="all">All Status</option>
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="Maintenance">Maintenance</option>
              </Form.Select>
            </Col>

            {/* Type Filter */}
            <Col md={4}>
              <Form.Label className="fw-semibold">Filter by Type</Form.Label>
              <Form.Select 
                value={typeFilter} 
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-100"
              >
                <option value="all">All Types</option>
                {availableTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Col>

            {/* Search */}
            {/* <Col md={4}>
              <Form.Label className="fw-semibold">Search Rooms</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by name or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Col> */}
          </Row>

          {/* Filter Results Counter */}
          <div className="mt-3 p-2 bg-light rounded">
            <Row className="align-items-center">
              <Col md={8}>
                <small className="text-muted">
                  Showing <strong>{filteredRooms.length}</strong> of <strong>{rooms.length}</strong> rooms
                </small>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
      {/* Rooms Table */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '120px' }}>Image</th>
                  <th>Room Name</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Hourly Rate</th>
                  <th>Status</th>
                  <th style={{ width: '150px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => (
                    <tr key={room.id}>
                      <td>
                        {room.image ? (
                          <img 
                            src={room.image} 
                            alt={room.name}
                            className="img-thumbnail"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/default-room.png';
                            }}
                          />
                        ) : (
                          <div className="bg-light d-flex align-items-center justify-content-center" 
                               style={{ width: '50px', height: '50px', borderRadius: '0.375rem' }}>
                            <FontAwesomeIcon icon={faImage} className="text-muted" />
                          </div>
                        )}
                      </td>
                      <td>
                        <div>
                          <strong>{room.name}</strong>
                          {room.title !== room.name && (
                            <div className="small text-muted">{room.title}</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <strong  className="px-2 py-1">
                          {room.type}
                        </strong>
                      </td>
                      <td>
                        <strong >
                          {room.capacity} people
                        </strong>
                      </td>
                      <td>
                        <strong>${room.hourlyRate}/hr</strong>
                      </td>
                      <td>
                        <Badge 
                          bg={getStatusBadgeVariant(room.status)}
                          className="px-2 py-1"
                        >
                          {room.status}
                        </Badge>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => toggleRoomStatus(room.id, room.status)}
                            title="Toggle Status"
                          >
                            <FontAwesomeIcon icon={faCheckCircle} />
                          </Button>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleEditRoom(room)}
                            title="Edit"
                          >
                            <FontAwesomeIcon icon={faEdit} />
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
                        <FontAwesomeIcon icon={faTimesCircle} className="me-2" size="3x" />
                        <div className="mt-3">No rooms found</div>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="mt-3"
                          onClick={() => {
                            resetForm();
                            setShowAddModal(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus} className="me-2" />
                          Add your first room
                        </Button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/*  Add/Edit Room Modal */}
      <Modal show={showAddModal} onHide={() => {
        setShowAddModal(false);
        resetForm();
      }} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingRoom ? 'Edit Room' : 'Add New Room'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Room Name (Admin/Internal) */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Room Name <span className="text-muted small">(Admin)</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Executive Suite 101"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Internal name for admin management
              </Form.Text>
            </Form.Group>

            {/* Room Title (User Display) */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Room Title <span className="text-success small">(User Display)</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Executive Suite"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Display name shown to users
              </Form.Text>
            </Form.Group>

            {/* Room Type */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Room Type</Form.Label>
              <Form.Select
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value)}
                required
              >
                <option value="">Select type</option>
                <option value="Suite">Suite</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Conference">Conference</option>
                <option value="Single">Single Seat</option>
                <option value="Private">Private Room</option>
              </Form.Select>
            </Form.Group>

            {/*  Description */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe this room for users..."
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
              <Form.Text className="text-muted">
                Description shown to users when booking
              </Form.Text>
            </Form.Group>

            {/*  Image URL */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Room Image URL</Form.Label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faImage} />
                </span>
                <Form.Control
                  type="url"
                  placeholder="https://example.com/room-image.jpg"
                  value={formData.image || ''}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                />
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img 
                    src={formData.image} 
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxWidth: '200px', maxHeight: '150px' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
              <Form.Text className="text-muted">
                Image URL for room display (optional)
              </Form.Text>
            </Form.Group>

            {/*  Capacity & Rate */}
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Capacity (people)</Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    max={50}
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', Number(e.target.value))}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Hourly Rate ($)</Form.Label>
                  <Form.Control
                    type="number"
                    min={10}
                    step={5}
                    value={formData.hourlyRate}
                    onChange={(e) => handleInputChange('hourlyRate', Number(e.target.value))}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => {
              setShowAddModal(false);
              resetForm();
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleAddRoom}
            disabled={!formData.name || !formData.title || !formData.type || !formData.hourlyRate || formData.capacity < 1}
          >
            {editingRoom ? 'Update Room' : 'Add Room'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingManagement;