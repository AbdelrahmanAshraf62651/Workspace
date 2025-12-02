import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import GalleryImageCard from "../components/GalleryImageCard";
import AddEditImageModal from "../components/AddEditImageModal";
import { useGallery } from "../contexts/GalleryContext";
import type { GalleryImage } from "../types";

function AdminGalleryManagement() {
  const { images, addImage, updateImage, deleteImage, toggleVisibility } =
    useGallery();
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);

  const handleAddNew = () => {
    setEditingImage(null);
    setShowModal(true);
  };

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image);
    setShowModal(true);
  };

  const handleSave = (imageData: Omit<GalleryImage, "id">) => {
    if (editingImage) {
      updateImage(editingImage.id, imageData);
    } else {
      addImage(imageData);
    }
    setShowModal(false);
    setEditingImage(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
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

      {images.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No images found.</p>
        </div>
      ) : (
        <div className="row g-4">
          {images.map((image) => (
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
