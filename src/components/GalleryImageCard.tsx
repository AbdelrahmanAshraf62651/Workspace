import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import type { GalleryImage } from '../types';

interface GalleryImageCardProps {
  image: GalleryImage;
  onEdit: (image: GalleryImage) => void;
  onDelete: (id: number) => void;
  onToggleVisibility: (id: number) => void;
}

const GalleryImageCard: React.FC<GalleryImageCardProps> = ({
  image,
  onEdit,
  onDelete,
  onToggleVisibility,
}) => {
  return (
    <div className="card shadow-sm h-100">
      <img
        src={image.img}
        alt={image.title}
        className="card-img-top"
        style={{
          height: '200px',
          objectFit: 'cover',
          width: '100%',
        }}
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold">{image.title}</h5>
        <p className="card-text text-black-50 flex-grow-1" style={{ fontSize: '0.9rem' }}>
          {image.description}
        </p>
        <div className="d-flex align-items-center mb-3">
          <label className="form-check-label me-2" style={{ fontSize: '0.9rem' }}>
            Visible
          </label>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              checked={image.isVisible}
              onChange={() => onToggleVisibility(image.id)}
            />
          </div>
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn main-btn flex-grow-1"
            onClick={() => onEdit(image)}
          >
            <FontAwesomeIcon icon={faEdit} className="me-2" />
            Edit
          </button>
          <button
            className="btn btn-danger flex-grow-1"
            onClick={() => onDelete(image.id)}
          >
            <FontAwesomeIcon icon={faTrash} className="me-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default GalleryImageCard;