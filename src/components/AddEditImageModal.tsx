import { Modal, Button, Form } from 'react-bootstrap';
import type { GalleryImage } from '../types';

interface AddEditImageModalProps {
  show: boolean;
  onHide: () => void;
  onSave: () => void;
  formData: Omit<GalleryImage, 'id'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<GalleryImage, 'id'>>>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
}

function AddEditImageModal({
  show,
  onHide,
  onSave,
  formData,
  setFormData,
  onImageUpload,
  isEditing,
}: AddEditImageModalProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave();
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Image' : 'Add New Image'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="imageTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Enter image title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="imageDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Enter a brief description for the image"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="imageFile">
            <Form.Label>Image File</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={onImageUpload}
              required={!isEditing} // Image is only required when adding a new one
            />
            {formData.image && (
              <div className="mt-3">
                <p className="mb-1 small text-muted">Image Preview:</p>
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '200px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    border: '1px solid #dee2e6',
                  }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="imageVisibility">
            <Form.Check
              type="switch"
              name="isVisible"
              label="Visible in public gallery"
              checked={formData.isVisible}
              onChange={handleCheckboxChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            {isEditing ? 'Save Changes' : 'Add Image'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddEditImageModal;