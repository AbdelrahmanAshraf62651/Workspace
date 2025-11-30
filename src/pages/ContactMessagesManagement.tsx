import { useState, useEffect } from 'react';
import { Button, Badge, Table, Dropdown, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

function ContactMessagesManagement() {
  const [messagesData, setMessagesData] = useState<ContactMessage[]>([]);
  useEffect(() => {
    fetchMessagesData();
  }, []);

  const [loading, setLoading] = useState(true);
  const fetchMessagesData = () => setLoading(true);
  axios
    .get('https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/contact_message')
    .then((response) => {
      setMessagesData(response.data);
      console.log('Contact Messages Data:', response.data);
    })
    .catch((error) => {
      console.error('Error fetching contact messages data:', error);
    })
    .finally(() => setLoading(false));
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(
    null
  );

  // Sort messages by date (newest first)
  const sortedMessages = [...messagesData].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const markAsRead = (id: number) => {
    axios
      .patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/contact_message/${id}`,
        {
          is_read: true,
        }
      )
      .then(() => {
        setMessagesData((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg))
        );
      })
      .catch((error) => console.error('Error marking as read:', error));
  };

  const markAsUnread = (id: number) => {
    axios
      .patch(
        `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/contact_message/${id}`,
        {
          is_read: false,
        }
      )
      .then(() => {
        setMessagesData((prev) =>
          prev.map((msg) => (msg.id === id ? { ...msg, is_read: false } : msg))
        );
      })
      .catch((error) => console.error('Error marking as unread:', error));
  };

  const deleteMessage = (id: number) => {
    axios
      .delete(
        `https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/contact_message/${id}`
      )
      .then(() => {
        setMessagesData((prev) => prev.filter((msg) => msg.id !== id));
      })
      .catch((error) => console.error('Error deleting message:', error));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    if (!message.is_read) {
      markAsRead(message.id);
    }
  };

  const handleDeleteMessage = (id: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(id);
    }
  };

  // Statistics
  const unreadCount = messagesData.filter((m) => !m.is_read).length;
  const totalCount = messagesData.length;

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Contact Messages </h1>
          <p className="text-muted">
            Manage and respond to customer inquiries efficiently
          </p>
        </div>
        <div className="d-flex align-items-center gap-3">
          <div className="text-center">
            <div className="fw-semibold text-primary fs-4">{totalCount}</div>
            <small className="text-muted">Total Messages</small>
          </div>
          <div className="text-center">
            <div className="fw-semibold text-danger fs-4">{unreadCount}</div>
            <small className="text-muted">Unread Messages</small>
          </div>
        </div>
      </div>
      <div className="shadow-sm">
        <div className="p-0">
          <div className="table-responsive rounded">
            <Table className="table table-hover mb-0">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '50px' }}></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th style={{ width: '150px' }}>Received At</th>
                  <th style={{ width: '100px' }}>Status</th>
                  <th style={{ width: '120px' }}>Actions</th>
                </tr>
  </thead>
  {loading ? (
    <tbody>
      <tr>
        <td colSpan={7}>
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  ) : (
    <tbody>
    {sortedMessages.length > 0 ? (
      sortedMessages.map((message) => (
        <tr
          key={message.id}
          className={!message.is_read ? 'table-info' : ''}
        >
          <td>
            <FontAwesomeIcon
              icon={faEnvelope}
              className={
                !message.is_read ? 'text-primary' : 'text-muted'
              }
            />
          </td>
          <td>
            <strong>{message.name}</strong>
          </td>
          <td>
            <small className="text-muted">{message.email}</small>
          </td>
          <td
            className="text-truncate"
            style={{ maxWidth: '250px' }}
          >
            {message.subject}
          </td>
          <td>
            <small className="text-muted">
              {message.created_at}
            </small>
          </td>
          <td>
            <div className="d-flex align-items-center">
              <p
                className={`rounded-pill px-2 small text-white text-center  ${
                  message.is_read ? 'bg-success' : 'bg-danger'
                }`}
              >
                {message.is_read ? 'Read' : 'Unread'}
              </p>
            </div>
          </td>
          <td>
            <div className="btn-group" role="group">
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-primary"
                  size="sm"
                  id="dropdown-actions"
                  title="Actions"
                >
                  <FontAwesomeIcon icon={faEye} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleViewMessage(message)}
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      className="me-2"
                    />
                    View Message
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() =>
                      message.is_read
                        ? markAsUnread(message.id)
                        : markAsRead(message.id)
                    }
                  >
                    <FontAwesomeIcon
                      icon={message.is_read ? faEyeSlash : faEye}
                      className="me-2"
                    />
                    {message.is_read
                      ? 'Mark as Unread'
                      : 'Mark as Read'}
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => handleDeleteMessage(message.id)}
                    className="text-danger"
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="me-2"
                    />
                    Delete Message
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={7} className="text-center py-5">
          <div className="text-muted">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="me-2"
              size="3x"
            />
            <div className="mt-3">No messages found</div>
            <small className="text-muted">
              Messages will appear here when customers contact you
            </small>
          </div>
        </td>
      </tr>
    )}
  </tbody>
  )}
  
</Table>
          </div>
        </div>
      </div>

      {/* Message Detail Modal */}
      <Modal
        show={showMessageModal}
        onHide={() => setShowMessageModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <strong>{selectedMessage?.subject}</strong>
              <Badge
                bg={selectedMessage?.is_read ? 'success' : 'danger'}
                className="ms-2"
              >
                {selectedMessage?.is_read ? 'Read' : 'Unread'}
              </Badge>
            </div>
            <small className="text-muted">
              From: {selectedMessage?.name} &lt;{selectedMessage?.email}&gt;
            </small>
            <div className="mt-1">
              <small className="text-muted">
                Received:{' '}
                {selectedMessage && formatDate(selectedMessage.created_at)}
              </small>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <p className="lead">{selectedMessage?.message}</p>
          </div>
          <div className="d-flex justify-content-end">
            <div className="btn-group">
              <Button
                variant="outline-success"
                size="sm"
                onClick={() =>
                  selectedMessage && markAsRead(selectedMessage.id)
                }
              >
                Mark as Read
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  setShowMessageModal(false);
                  if (selectedMessage) deleteMessage(selectedMessage.id);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ContactMessagesManagement;
