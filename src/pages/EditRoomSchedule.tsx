import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
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
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <div
      className="container pt-5"
      style={{ pointerEvents: addNewRoom || editingRoom ? 'none' : 'auto' }}
    >
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
            {(addNewRoom || editingRoom) && (
              <div
                className="position-fixed bottom-0 end-0 top-0 start-0 bg-black bg-opacity-75 p-3 rounded-bottom d-flex flex-column justify-content-center align-items-center "
                style={{
                  height: '100vh',
                  zIndex: 1040,
                  pointerEvents: 'auto',
                }}
                onClick={handleCloseModal}
              >
                <form
                  className="d-flex flex-column p-5 bg-light gap-2 rounded"
                  style={{ width: '50vw', minWidth: '300px', zIndex: 1050 }}
                  onSubmit={handleSubmit}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="mb-3">
                    {editingRoom ? 'Edit Room' : 'Add New Room'}
                  </h3>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    name="name"
                    value={editingRoom ? editingRoom.name : newRoom.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Type"
                    className="form-control"
                    name="type"
                    value={editingRoom ? editingRoom.type : newRoom.type}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    className="form-control"
                    name="room_description"
                    value={
                      editingRoom
                        ? editingRoom.room_description
                        : newRoom.room_description
                    }
                    onChange={handleInputChange}
                    required
                  />
                  <div className="form-group d-flex justify-content-between align-items-center">
                    <div>
                      <label htmlFor="capacity">Capacity:</label>
                      <input
                        type="number"
                        placeholder="Capacity"
                        className="form-control"
                        name="capacity"
                        min={1}
                        value={
                          editingRoom ? editingRoom.capacity : newRoom.capacity
                        }
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="hourly_rate" className="">
                        Cost:
                      </label>
                      <input
                        type="number"
                        placeholder="Hourly Rate"
                        className="form-control"
                        name="hourly_rate"
                        min={0}
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
                  <input
                    type="file"
                    name="Image"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {editingRoom && editingRoom.image && (
                    <div>
                      <small className="text-muted">Current image:</small>
                      <img
                        src={editingRoom.image}
                        alt="Current"
                        style={{
                          maxWidth: '100px',
                          maxHeight: '100px',
                          marginTop: '5px',
                        }}
                      />
                    </div>
                  )}
                  <div className="d-flex gap-1 justify-content-end">
                    <div>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleCloseModal}
                      >
                        Cancel
                      </button>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="btn btn-dark"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        ) : editingRoom ? (
                          'Update Room'
                        ) : (
                          'Add Room'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
            <Table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th className='text-center'>Name</th>
                  <th className='text-center'>Image</th>
                  <th className='text-center'>Type</th>
                  <th className='text-center'>Description</th>
                  <th className='text-center'>Capacity</th>
                  <th className='text-center'>Hourly Rate</th>
                  <th className='text-center'>Status</th>
                  <th className='text-center' style={{ width: '150px' }}>Actions</th>
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
                      <td className='text-center'>
                        <strong>{room.name}</strong>
                      </td>
                      <td className='text-center'>
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
                      <td className='text-center'>
                        <strong>{room.type}</strong>
                      </td>
                      <td className='text-center'>
                        <strong>{room.room_description}</strong>
                      </td>
                      <td className='text-center'>
                        <strong>{room.capacity} Person</strong>
                      </td>
                      <td className='text-center'>
                        <strong>{room.hourly_rate} EGP</strong>
                      </td>
                      <td className='text-center'>
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
                      <td className='text-center'>
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
