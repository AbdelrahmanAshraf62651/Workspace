import { useState, useEffect } from "react";
import {
  Form,
  Button,
  Badge,
  Modal,
  Table,
  Alert,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faEdit,
  faTrash,
  faCheckCircle,
  faTimesCircle,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

interface Room {
  id: string;
  name: string;
  title: string;
  type: string;
  description: string | null;
  image: string | null;
  capacity: number;
  hourlyRate: number;
  status: "Available" | "Booked" | "Maintenance";
}

function BookingManagement() {
  const [rooms, setRooms] = useState<Room[]>([]);
  useEffect(() => {
    axios
      .get("https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking")
      .then((response) => {
        setRooms(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching rooms:", error);
      });
  }, []);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    type: "",
    description: "",
    image: "",
    capacity: 1,
    hourlyRate: 0,
  });

  // Success/Error Messages
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );
  // Load editing room data
  useEffect(() => {
    if (editingRoom) {
      setFormData({
        name: editingRoom.name,
        title: editingRoom.title || "",
        type: editingRoom.type,
        description: editingRoom.description || "",
        image: editingRoom.image || "",
        capacity: editingRoom.capacity,
        hourlyRate: editingRoom.hourlyRate,
      });
    }
  }, [editingRoom]);

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      type: "",
      description: "",
      image: "",
      capacity: 1,
      hourlyRate: 0,
    });
    setEditingRoom(null);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addRoom = async (roomData: Record<string, any>) => {
    const response = await axios.post(
      "https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking",
      roomData
    );
    setRooms([...rooms, response.data]);
    return response.data;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateRoom = async (id: string, roomData: Record<string, any>) => {
    const response = await axios.put(
      `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking/${id}`,
      roomData
    );
    setRooms(rooms.map((room) => (room.id === id ? response.data : room)));
    return response.data;
  };

  const deleteRoom = async (id: string) => {
    await axios.delete(
      `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/booking/${id}`
    );
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const toggleRoomStatus = async (id: string, currentStatus: string) => {
    const statusMap: { [key: string]: string } = {
      Available: "Booked",
      Booked: "Maintenance",
      Maintenance: "Available",
    };
    const newStatus = statusMap[currentStatus] || "Available";
    await updateRoom(id, { status: newStatus });
  };
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
        showMessage("Room updated successfully!", "success");
      } else {
        await addRoom(roomData);
        showMessage("Room added successfully!", "success");
      }
      setShowAddModal(false);
      resetForm();
    } catch (error) {
      console.error("Error saving room:", error);
      showMessage("Error saving room. Please try again.", "error");
    }
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
    setShowAddModal(true);
  };

  const handleDeleteRoom = (id: string) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      deleteRoom(id);
      showMessage("Room deleted successfully!", "success");
    }
  };

  const getStatusBadgeVariant = (status: Room["status"]) => {
    switch (status) {
      case "Available":
        return "success";
      case "Booked":
        return "danger";
      case "Maintenance":
        return "secondary";
      default:
        return "secondary";
    }
  };

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
          variant={messageType === "success" ? "success" : "danger"}
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
                  <Badge bg="primary" className="ms-2">
                    {rooms.length}
                  </Badge>
                </div>
                <div>
                  <span className="fw-semibold">Available:</span>
                  <Badge bg="success" className="ms-2">
                    {rooms.filter((r) => r.status === "Available").length}
                  </Badge>
                </div>
                <div>
                  <span className="fw-semibold">Booked:</span>
                  <Badge bg="danger" className="ms-2">
                    {rooms.filter((r) => r.status === "Booked").length}
                  </Badge>
                </div>
                <div>
                  <span className="fw-semibold">Maintenance:</span>
                  <Badge bg="secondary" className="ms-2">
                    {rooms.filter((r) => r.status === "Maintenance").length}
                  </Badge>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <div className="d-flex justify-content-end gap-2"></div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Rooms Table */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th>User Name</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Hourly Rate</th>
                  <th>Status</th>
                  <th style={{ width: "150px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.length > 0 ? (
                  rooms.map((room) => (
                    <tr key={room.id}>
                      <td>
                        <div>
                          <strong>{room.name}</strong>
                          {room.title !== room.name && (
                            <div className="small text-muted">{room.title}</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <strong className="px-2 py-1">{room.type}</strong>
                      </td>
                      <td>
                        <strong>{room.capacity} people</strong>
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
                            onClick={() =>
                              toggleRoomStatus(room.id, room.status)
                            }
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
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="me-2"
                          size="3x"
                        />
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
      <Modal
        show={showAddModal}
        onHide={() => {
          setShowAddModal(false);
          resetForm();
        }}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editingRoom ? "Edit Room" : "Add New Room"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Room Name (Admin/Internal) */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Room Name <span className="text-muted small">(Admin)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Executive Suite 101"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Internal name for admin management
              </Form.Text>
            </Form.Group>

            {/* Room Title (User Display) */}
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">
                Room Title{" "}
                <span className="text-success small">(User Display)</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g., Executive Suite"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
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
                onChange={(e) => handleInputChange("type", e.target.value)}
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
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
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
                  value={formData.image || ""}
                  onChange={(e) => handleInputChange("image", e.target.value)}
                />
              </div>
              {formData.image && (
                <div className="mt-2">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="img-thumbnail"
                    style={{ maxWidth: "200px", maxHeight: "150px" }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
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
                  <Form.Label className="fw-semibold">
                    Capacity (people)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min={1}
                    max={50}
                    value={formData.capacity}
                    onChange={(e) =>
                      handleInputChange("capacity", Number(e.target.value))
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">
                    Hourly Rate ($)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    min={10}
                    step={5}
                    value={formData.hourlyRate}
                    onChange={(e) =>
                      handleInputChange("hourlyRate", Number(e.target.value))
                    }
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
            disabled={
              !formData.name ||
              !formData.title ||
              !formData.type ||
              !formData.hourlyRate ||
              formData.capacity < 1
            }
          >
            {editingRoom ? "Update Room" : "Add Room"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingManagement;
