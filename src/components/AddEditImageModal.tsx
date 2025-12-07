import { Modal, Form, Spinner, Button } from 'react-bootstrap';
import type { GalleryImage } from '../types';

interface AddEditImageModalProps {
  show: boolean;
  onHide: () => void;
  onSave: () => void;
  formData: Omit<GalleryImage, 'id'>;
  setFormData: React.Dispatch<React.SetStateAction<Omit<GalleryImage, 'id'>>>;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing: boolean;
  isSubmitting: boolean;
}

function AddEditImageModal({
  show,
  onHide,
  onSave,
  formData,
  setFormData,
  onImageUpload,
  isEditing,
  isSubmitting,
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
    <Modal
      show={show}
      onHide={isSubmitting ? undefined : onHide}
      centered
      size="lg"
      backdrop={isSubmitting ? 'static' : true}
      keyboard={!isSubmitting}
    >
      <Modal.Header closeButton={!isSubmitting}>
        <Modal.Title>{isEditing ? 'Edit Image' : 'Add New Image'}</Modal.Title>
      </Modal.Header>

      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {/* Wrap inputs in fieldset to disable all at once during loading */}
          <fieldset disabled={isSubmitting}>
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
                placeholder="Enter a brief description"
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
                required={!isEditing && !formData.image}
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
                      opacity: isSubmitting ? 0.6 : 1,
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
          </fieldset>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} className="px-4">
            Cancel
          </Button>

          <Button variant="dark" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Spinner as="span" size="sm" role="status" aria-hidden="true" />
              </>
            ) : (
              'Save Changes'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddEditImageModal;
