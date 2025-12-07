import { useState, useEffect } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faEdit,
  faPlus,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
interface Room {
  id: string;
  name: string;
  type: string;
  room_description: string;
  capacity: number;
  hourly_rate: number;
  image: string;
  status: 'unavailable' | 'available';
}
function EditRoomSchedule() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/room')
      .then((response) => {
        setRooms(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching rooms:', error);
      })
      .finally(() => setLoading(false));
  }, []);
  const deleteRoom = async (id: string) => {
    await axios.delete(
      `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/room/${id}`
    );
    setRooms(rooms.filter((room) => room.id !== id));
  };

  const [addNewRoom, setAddNewRoom] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [, setBase64Image] = useState<string | null>(null);
  const [newRoom, setNewRoom] = useState({
    name: '',
    type: '',
    room_description: '',
    capacity: 0,
    hourly_rate: 0,
    status: 'unavailable',
    image: '',
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (editingRoom) {
      setEditingRoom((prevRoom) => ({
        ...prevRoom!,
        [name]:
          name === 'capacity' || name === 'hourly_rate' ? Number(value) : value,
      }));
    } else {
      setNewRoom((prevRoom) => ({
        ...prevRoom,
        [name]:
          name === 'capacity' || name === 'hourly_rate' ? Number(value) : value,
      }));
    }
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (editingRoom) {
      axios
        .patch(
          `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/room/${editingRoom.id}`,
          editingRoom
        )
        .then((response) => {
          setRooms(
            rooms.map((r) => (r.id === editingRoom.id ? response.data : r))
          );
          setEditingRoom(null);
          setBase64Image(null);
        })
        .catch((error) => {
          console.error('Error updating room:', error);
        })
        .finally(() => setIsSubmitting(false));
    } else {
      axios
        .post('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/room', newRoom)
        .then((response) => {
          setRooms([...rooms, response.data]);
          setNewRoom({
            name: '',
            type: '',
            room_description: '',
            capacity: 0,
            hourly_rate: 0,
            status: 'unavailable',
            image: '',
          });
          setBase64Image(null);
          setAddNewRoom(false);
        })
        .catch((error) => {
          console.error('Error adding room:', error);
        })
        .finally(() => setIsSubmitting(false));
    }
  };

  const toggleRoomStatus = async (id: string, currentStatus: string) => {
    const newStatus =
      currentStatus === 'available' ? 'unavailable' : 'available';
    try {
      const response = await axios.patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/room/${id}`,
        { status: newStatus }
      );
      setRooms(rooms.map((r) => (r.id === id ? response.data : r)));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteRoom = (id: string) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      deleteRoom(id);
    }
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setBase64Image(base64String);
        if (editingRoom) {
          setEditingRoom((prevRoom) => ({
            ...prevRoom!,
            image: base64String,
          }));
        } else {
          setNewRoom((prevRoom) => ({
            ...prevRoom,
            image: base64String,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditRoom = (room: Room) => {
    setEditingRoom(room);
  };

  const handleCloseEdit = () => {
    setEditingRoom(null);
    setBase64Image(null);
  };

  // New function to handle closing the form/modal
  const handleCloseModal = () => {
    if (editingRoom) {
      handleCloseEdit();
    } else if (addNewRoom) {
      setAddNewRoom(false);
    }
  };

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Rooms</h1>
          <p className="text-muted">
            Manage your booking rooms, their details, and availability status
          </p>
        </div>
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => setAddNewRoom(!addNewRoom)}
        >
          <FontAwesomeIcon icon={faPlus} />
          Add Room
        </button>
      </div>
      <div className="shadow-sm">
        <div className="p-0">
          <div className="table-responsive rounded">
            <Modal
              show={addNewRoom || !!editingRoom}
              onHide={handleCloseModal}
              centered
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title className="fw-bold">
                  {editingRoom ? 'Edit Room' : 'Add New Room'}
                </Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <form
                  id="room-form"
                  className="d-flex flex-column gap-3"
                  onSubmit={handleSubmit}
                >
                  {/* Name & Type */}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Room Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter room name"
                        name="name"
                        value={editingRoom ? editingRoom.name : newRoom.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Room Type
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Conference, Study, etc."
                        name="type"
                        value={editingRoom ? editingRoom.type : newRoom.type}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="form-label fw-semibold">
                      Description
                    </label>
                    <textarea
                      className="form-control"
                      name="room_description"
                      rows={3}
                      placeholder="Write a short room description..."
                      value={
                        editingRoom
                          ? editingRoom.room_description
                          : newRoom.room_description
                      }
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>

                  {/* Capacity & Cost */}
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold">Capacity</label>
                      <input
                        type="number"
                        min={1}
                        className="form-control"
                        name="capacity"
                        placeholder="Number of people"
                        value={
                          editingRoom ? editingRoom.capacity : newRoom.capacity
                        }
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold">
                        Cost per Hour
                      </label>
                      <input
                        type="number"
                        min={0}
                        className="form-control"
                        name="hourly_rate"
                        placeholder="EGP / hour"
                        value={
                          editingRoom
                            ? editingRoom.hourly_rate
                            : newRoom.hourly_rate
                        }
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="form-label fw-semibold">Room Image</label>
                    <input
                      type="file"
                      className="form-control"
                      name="Image"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />

                    {editingRoom && editingRoom.image && (
                      <div className="mt-2">
                        <small className="text-muted">Current Image:</small>
                        <br />
                        <img
                          src={editingRoom.image}
                          alt="Room"
                          className="rounded border mt-1"
                          style={{
                            maxWidth: '120px',
                            maxHeight: '120px',
                            objectFit: 'cover',
                          }}
                        />
                      </div>
                    )}
                  </div>
                </form>
              </Modal.Body>

              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={handleCloseModal}
                  className="px-4"
                >
                  Cancel
                </Button>

                <Button
                  variant="dark"
                  type="submit"
                  form="room-form"
                  disabled={isSubmitting}
                  className="px-4"
                >
                  {isSubmitting ? (
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : editingRoom ? (
                    'Save Changes'
                  ) : (
                    'Add Room'
                  )}
                </Button>
              </Modal.Footer>
            </Modal>

            <Table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th className="text-center">Name</th>
                  <th className="text-center">Image</th>
                  <th className="text-center">Type</th>
                  <th className="text-center">Description</th>
                  <th className="text-center">Capacity</th>
                  <th className="text-center">Hourly Rate</th>
                  <th className="text-center">Status</th>
                  <th className="text-center" style={{ width: '150px' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8}>
                      <div className="d-flex justify-content-center py-5">
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : rooms.length > 0 ? (
                  rooms.map((room) => (
                    <tr key={room.id} className="align-middle">
                      <td className="text-center">{room.name}</td>
                      <td className="text-center">
                        <img
                          src={room.image}
                          alt={room.name}
                          style={{
                            width: '80px',
                            height: '80px',
                            objectFit: 'cover',
                          }}
                        />
                      </td>
                      <td className="text-center">{room.type}</td>
                      <td className="text-center">{room.room_description}</td>
                      <td className="text-center">{room.capacity} Person</td>
                      <td className="text-center">
                        {room.hourly_rate.toFixed(2)} EGP
                      </td>
                      <td className="text-center">
                        <div className="form-check form-switch text-center d-flex justify-content-center">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitchCheckChecked-${room.id}`}
                            checked={room.status === 'available'}
                            onChange={() =>
                              toggleRoomStatus(room.id, room.status)
                            }
                          />
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="btn-group" role="group">
                          <button
                            className="btn btn-outline-primary"
                            title="Edit"
                            onClick={() => handleEditRoom(room)}
                            type="button"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => handleDeleteRoom(room.id)}
                            title="Delete"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-5">
                      <div className="text-muted">
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="me-2"
                          size="3x"
                        />
                        <div className="mt-3">No Room Available</div>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRoomSchedule;
