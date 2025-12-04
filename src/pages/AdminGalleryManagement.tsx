import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import GalleryImageCard from "../components/GalleryImageCard";
import AddEditImageModal from "../components/AddEditImageModal";
import type { GalleryImage } from "../types";
import axios from "axios";

const emptyImage: Omit<GalleryImage, "id"> = {
  image: "",
  title: "",
  description: "",
  isVisible: true,
};

function AdminGalleryManagement() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [formData, setFormData] =
    useState<Omit<GalleryImage, "id">>(emptyImage);
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/gallery";

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => console.error("Error fetching gallery images:", error))
      .finally(() => setIsLoading(false));
  }, []);

  const handleAddNew = () => {
    setEditingImage(null);
    setFormData(emptyImage);
    setShowModal(true);
  };

  const handleEdit = (imageToEdit: GalleryImage) => {
    setEditingImage(imageToEdit);
    setFormData({
      image: imageToEdit.image,
      title: imageToEdit.title,
      description: imageToEdit.description,
      isVisible: imageToEdit.isVisible,
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const imageData = formData;
    if (editingImage) {
      axios
        .patch(`${API_URL}/${editingImage.id}`, imageData)
        .then((response) => {
          setImages(
            images.map((imageItem) =>
              imageItem.id === editingImage.id ? response.data : imageItem
            )
          );
        })
        .catch((error) => console.error("Error updating image:", error));
    } else {
      axios
        .post(API_URL, imageData)
        .then((response) => {
          setImages([...images, response.data]);
        })
        .catch((error) => console.error("Error adding image:", error));
    }
    setShowModal(false);
    setEditingImage(null);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      axios
        .delete(`${API_URL}/${id}`)
        .then(() => {
          setImages(images.filter((imageItem) => imageItem.id !== id));
        })
        .catch((error) => console.error("Error deleting image:", error));
    }
  };

  const toggleVisibility = (id: number) => {
    // Find the original image to get its current state and to revert on error
    const originalImage = images.find((img) => img.id === id);
    if (!originalImage) return;

    
    // Immediately update the UI to make it feel responsive.
    setImages((currentImages) =>
      currentImages.map((img) =>
        img.id === id ? { ...img, isVisible: !img.isVisible } : img
      )
    );

    const imageData = {
      image: originalImage.image,
      title: originalImage.title,
      description: originalImage.description,
      isVisible: !originalImage.isVisible,
    };
    axios
      .patch(`${API_URL}/${id}`, imageData)
      .catch((error) => {
        console.error("Error updating visibility:", error);
        // If the API call fails, revert the UI back to its original state.
        setImages((currentImages) =>
          currentImages.map((img) => (img.id === id ? originalImage : img))
        );
        alert("Failed to update visibility. The change has been reverted.");
      });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData((prevData) => ({ ...prevData, image: base64String }));
      };
      reader.readAsDataURL(file);
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

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : images.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No images in the gallery yet.</p>
        </div>
      ) : (
        <div className="row g-4">
          {images.map((imageItem) => (
            <div key={imageItem.id} className="col-12 col-md-6 col-lg-4">
              <GalleryImageCard
                image={imageItem}
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
        onSave={handleSave} // onSave no longer passes data
        formData={formData}
        setFormData={setFormData}
        onImageUpload={handleImageUpload}
        isEditing={!!editingImage}
      />
    </div>
  );
}

export default AdminGalleryManagement;
