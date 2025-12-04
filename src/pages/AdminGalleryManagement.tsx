import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import GalleryImageCard from '../components/GalleryImageCard';
import AddEditImageModal from '../components/AddEditImageModal';
import type { GalleryImage } from '../types';

const API_URL = 'https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/room';

const initialForm: Omit<GalleryImage, 'id'> = {
  image: '',
  title: '',
  description: '',
  isVisible: true,
};

interface ApiGalleryImage {
  id: number;
  image: string;
  name: string;
  room_description: string;
  gallery_visible: boolean;
}

const mapToGalleryImage = (data: ApiGalleryImage): GalleryImage => ({
  id: data.id,
  image: data.image,
  title: data.name,
  description: data.room_description,
  isVisible: data.gallery_visible,
});

export default function AdminGalleryManager() {
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [form, setForm] = useState<Omit<GalleryImage, 'id'>>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(API_URL);
        const mapped = response.data.map(mapToGalleryImage);
        setGallery(mapped);
      } catch (err) {
        console.error('Failed to fetch gallery images', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const handleEdit = (image: GalleryImage) => {
    setCurrentImage(image);
    setForm({
      image: image.image,
      title: image.title,
      description: image.description,
      isVisible: image.isVisible,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setIsSubmitting(true);

    const payload = {
      image: form.image,
      name: form.title,
      room_description: form.description,
      gallery_visible: form.isVisible,
    };

    try {
      const response = currentImage
        ? await axios.patch(`${API_URL}/${currentImage.id}`, payload)
        : await axios.post(API_URL, payload);

      const updated = mapToGalleryImage(response.data);

      setGallery((prev) =>
        currentImage
          ? prev.map((img) => (img.id === currentImage.id ? updated : img))
          : [...prev, updated]
      );

      setIsModalOpen(false);
      setCurrentImage(null);
      setForm(initialForm);
    } catch (err) {
      console.error('Failed to save image', err);
      alert('Failed to save image. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      setGallery((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error('Failed to delete', err);
    }
  };

  const handleToggleVisibility = async (id: number) => {
    const target = gallery.find((img) => img.id === id);
    if (!target) return;

    const originalVisibility = target.isVisible;
    const newVisibility = !originalVisibility;

    setGallery((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, isVisible: newVisibility } : img
      )
    );

    const payload = {
      gallery_visible: newVisibility,
    };

    try {
      await axios.patch(`${API_URL}/${id}`, payload);
    } catch (err) {
      console.error('Failed to toggle visibility', err);
      alert('Error updating visibility');
      setGallery((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, isVisible: originalVisibility } : img
        )
      );
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container pt-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="fw-bold">Gallery Manager</h1>
      </header>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border" />
        </div>
      ) : gallery.length === 0 ? (
        <>
          <div className="text-center py-5">
            <div className="text-muted">
              <FontAwesomeIcon
                icon={faTimesCircle}
                className="me-2"
                size="3x"
              />
              <div className="mt-3">No Gallery Items Available</div>
            </div>
          </div>
        </>
      ) : (
        <div className="row g-4">
          {gallery.map((img) => (
            <div key={img.id} className="col-12 col-md-6 col-lg-4">
              <GalleryImageCard
                image={img}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleVisibility={handleToggleVisibility}
              />
            </div>
          ))}
        </div>
      )}

      <AddEditImageModal
        show={isModalOpen}
        onHide={() => {
          setIsModalOpen(false);
          setCurrentImage(null);
          setForm(initialForm);
        }}
        onSave={handleSave}
        formData={form}
        setFormData={setForm}
        onImageUpload={handleUpload}
        isEditing={!!currentImage}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
