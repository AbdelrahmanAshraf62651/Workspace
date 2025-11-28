import React, { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import GalleryImageCard from '../components/GalleryImageCard';
import AddEditImageModal from '../components/AddEditImageModal';
import { useGallery } from '../contexts/GalleryContext';
import type { GalleryImage } from '../types';

function AdminGalleryManagement() {
  
  const { images, addImage, updateImage, deleteImage, toggleVisibility } = useGallery();
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showHidden, setShowHidden] = useState(false);

  const filteredImages = useMemo(() => {
    let filtered = images;

    
    if (!showHidden) {
      filtered = filtered.filter((img) => img.isVisible);
    }

   
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (img) =>
          img.title.toLowerCase().includes(query) ||
          img.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [images, searchQuery, showHidden]);

  const handleAddNew = () => {
    setEditingImage(null);
    setShowModal(true);
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setShowModal(true);
  };

  const handleSave = (imageData: Omit<GalleryImage, 'id'>) => {
    if (editingImage) {
      updateImage(editingImage.id, imageData);
    } else {
      addImage(imageData);
    }
    setShowModal(false);
    setEditingImage(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteImage(id);
    }
  };

  return (
    <div className="container pt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Gallery Management</h1>
        <button className="btn sec-btn" onClick={handleAddNew}>
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Add New Image
        </button>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="showHiddenSwitch"
            checked={showHidden}
            onChange={(e) => setShowHidden(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="showHiddenSwitch">
            Show Hidden Images
          </label>
        </div>
        <div className="position-relative" style={{ maxWidth: '400px', width: '100%' }}>
          <FontAwesomeIcon
            icon={faSearch}
            className="position-absolute"
            style={{ left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }}
          />
          <input
            type="text"
            className="form-control ps-5"
            placeholder="Search images by title or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No images found.</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredImages.map((image) => (
            <div key={image.id} className="col-12 col-md-6 col-lg-4">
              <GalleryImageCard
                image={image}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleVisibility={toggleVisibility}
              />
            </div>
          ))}
        </div>
      )}

      <AddEditImageModal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditingImage(null);
        }}
        onSave={handleSave}
        editingImage={editingImage}
      />
    </div>
  );
}

export default AdminGalleryManagement;
