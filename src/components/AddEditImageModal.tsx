import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import type { GalleryImage } from '../types';

interface AddEditImageModalProps {
  show: boolean;
  onHide: () => void;
  onSave: (image: Omit<GalleryImage, 'id'>) => void;
  editingImage: GalleryImage | null;
}

const AddEditImageModal: React.FC<AddEditImageModalProps> = ({
  show,
  onHide,
  onSave,
  editingImage,
}) => {
  const [formData, setFormData] = useState({
    img: '',
    title: '',
    description: '',
    isVisible: true,
  });

  const [errors, setErrors] = useState({
    img: '',
    title: '',
    description: '',
  });

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (editingImage) {
      setFormData({
        img: editingImage.img,
        title: editingImage.title,
        description: editingImage.description,
        isVisible: editingImage.isVisible,
      });
    } else {
      setFormData({
        img: '',
        title: '',
        description: '',
        isVisible: true,
      });
    }
    setErrors({ img: '', title: '', description: '' });
    setImageError(false);
  }, [editingImage, show]);

  // Reset image error when image path changes
  useEffect(() => {
    setImageError(false);
  }, [formData.img]);

  const validate = (): boolean => {
    const newErrors = { img: '', title: '', description: '' };
    let isValid = true;

    // Validate image path
    if (!formData.img.trim()) {
      newErrors.img = 'Image path or URL is required';
      isValid = false;
    } else {
      // Check if it's a valid URL or local path
      const isUrl = formData.img.startsWith('http://') || formData.img.startsWith('https://');
      const isLocalPath = formData.img.startsWith('/images/');
      
      if (!isUrl && !isLocalPath) {
        newErrors.img = 'Image path must start with /images/ or be a valid URL (http:// or https://)';
        isValid = false;
      }
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate() && !imageError) {
      onSave(formData);
      onHide();
    }
  };

  const handleImageError = () => {
    setImageError(true);
    setErrors((prev) => ({
      ...prev,
      img: 'Image not found or cannot be loaded',
    }));
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{editingImage ? 'Edit Image' : 'Add New Image'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Image Path or URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="/images/gallery/image.jpg or https://example.com/image.jpg"
              value={formData.img}
              onChange={(e) =>
                setFormData({ ...formData, img: e.target.value })
              }
              isInvalid={!!errors.img || imageError}
            />
            <Form.Text className="text-muted">
              Enter a local path (e.g., /images/gallery/image.jpg) or a full URL (e.g., https://example.com/image.jpg)
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              {errors.img}
            </Form.Control.Feedback>
          </Form.Group>

          
          {formData.img && !imageError && (
            <Form.Group className="mb-3">
              <Form.Label>Preview</Form.Label>
              <div
                style={{
                  border: '1px solid #dee2e6',
                  borderRadius: '8px',
                  padding: '10px',
                  backgroundColor: '#f8f9fa',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '200px',
                }}
              >
                <img
                  src={formData.img}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    objectFit: 'contain',
                    borderRadius: '4px',
                  }}
                  onError={handleImageError}
                  onLoad={() => setImageError(false)}
                />
              </div>
            </Form.Group>
          )}

          {/* Error message for image */}
          {imageError && (
            <div className="alert alert-warning mb-3" role="alert">
              <strong>Warning:</strong> The image could not be loaded. Please check the path or URL.
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter image title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter image description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Check
            type="switch"
            id="visibility-switch"
            label="Visible in gallery"
            checked={formData.isVisible}
            onChange={(e) =>
              setFormData({ ...formData, isVisible: e.target.checked })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" className="sec-btn" disabled={imageError}>
            {editingImage ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddEditImageModal;