import { useState, useMemo } from 'react';
import { 
  Form, 
  Button, 
  Badge, 
  Table, 
  Card, 
  Row, 
  Col, 
  Dropdown,
  Modal
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faEye, 
  faEyeSlash, 
  faTrash, 
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { useContactMessages } from '../contexts/ContactMessagesContext';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
  isRead: boolean;
}

function ContactMessagesManagement() {
  const { messages, markAsRead, markAsUnread, deleteMessage } = useContactMessages();
  
  // Filters & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  // Filtered & Searched Messages
  const filteredMessages = useMemo(() => {
    return messages
      .filter(message => {
        // Status filter
        if (statusFilter !== 'all') {
          const isReadMatch = statusFilter === 'read' ? message.isRead : !message.isRead;
          if (!isReadMatch) return false;
        }
        
        // Search filter
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          return (
            message.name.toLowerCase().includes(searchLower) ||
            message.email.toLowerCase().includes(searchLower) ||
            message.subject.toLowerCase().includes(searchLower)
          );
        }
        
        return true;
      })
      .sort((a, b) => new Date(b.receivedAt).getTime() - new Date(a.receivedAt).getTime());
  }, [messages, searchTerm, statusFilter]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };

  const handleDeleteMessage = (id: number) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      deleteMessage(id);
    }
  };

  // Statistics
  const unreadCount = messages.filter(m => !m.isRead).length;
  const totalCount = messages.length;

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="fw-bold">Contact Messages </h1>
          <p className="text-muted">Manage and respond to customer inquiries efficiently</p>
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

      {/* Filters & Search */}
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row className="g-3 align-items-end">
            <Col md={5}>
              <Form.Label className="fw-semibold">Search</Form.Label>
              <div className="position-relative">
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" 
                />
                <Form.Control
                  type="text"
                  className="ps-5"
                  placeholder="Search by name, email, or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </Col>
            <Col md={3}>
              <Form.Label className="fw-semibold">Filter by Status</Form.Label>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'unread' | 'read')}
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read Only</option>
              </Form.Select>
            </Col>
            <Col md={4}>
              <div className="d-flex justify-content-end gap-2">
                <Badge bg="light" className="d-flex align-items-center gap-1">
                  <FontAwesomeIcon icon={faEnvelope} />
                  Showing {filteredMessages.length} messages
                </Badge>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Messages Table */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <div className="table-responsive">
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
              <tbody>
                {filteredMessages.length > 0 ? (
                  filteredMessages.map((message) => (
                    <tr key={message.id} className={!message.isRead ? 'table-info' : ''}>
                      <td>
                        <FontAwesomeIcon 
                          icon={faEnvelope} 
                          className={!message.isRead ? 'text-primary' : 'text-muted'} 
                        />
                      </td>
                      <td>
                        <strong>{message.name}</strong>
                      </td>
                      <td>
                        <small className="text-muted">{message.email}</small>
                      </td>
                      <td className="text-truncate" style={{ maxWidth: '250px' }}>
                        {message.subject}
                      </td>
                      <td>
                        <small className="text-muted">
                          {formatDate(message.receivedAt)}
                        </small>
                      </td>
                      <td>
                        <Badge 
                          bg={message.isRead ? 'success' : 'danger'}
                          className="px-2 py-1"
                        >
                          {message.isRead ? 'Read' : 'Unread'}
                        </Badge>
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
                              <Dropdown.Item onClick={() => handleViewMessage(message)}>
                                <FontAwesomeIcon icon={faEye} className="me-2" />
                                View Message
                              </Dropdown.Item>
                              <Dropdown.Item 
                                onClick={() => message.isRead ? markAsUnread(message.id) : markAsRead(message.id)}
                              >
                                <FontAwesomeIcon 
                                  icon={message.isRead ? faEyeSlash : faEye} 
                                  className="me-2" 
                                />
                                {message.isRead ? 'Mark as Unread' : 'Mark as Read'}
                              </Dropdown.Item>
                              <Dropdown.Divider />
                              <Dropdown.Item 
                                onClick={() => handleDeleteMessage(message.id)}
                                className="text-danger"
                              >
                                <FontAwesomeIcon icon={faTrash} className="me-2" />
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
                        <FontAwesomeIcon icon={faEnvelope} className="me-2" size="3x" />
                        <div className="mt-3">No messages found</div>
                        <small className="text-muted">
                          Messages will appear here when customers contact you
                        </small>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Message Detail Modal */}
      <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <div>
              <strong>{selectedMessage?.subject}</strong>
              <Badge 
                bg={selectedMessage?.isRead ? 'success' : 'danger'}
                className="ms-2"
              >
                {selectedMessage?.isRead ? 'Read' : 'Unread'}
              </Badge>
            </div>
            <small className="text-muted">
              From: {selectedMessage?.name} &lt;{selectedMessage?.email}&gt;
            </small>
            <div className="mt-1">
              <small className="text-muted">
                Received: {selectedMessage && formatDate(selectedMessage.receivedAt)}
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
                onClick={() => selectedMessage && markAsRead(selectedMessage.id)}
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