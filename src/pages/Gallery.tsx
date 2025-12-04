import ControlledCarousel from '../components/ControlledCarousel';
import GalleryThumbnail from '../components/GalleryThumbnail';
import { useState, useMemo, useEffect } from 'react';
import type { GalleryImage } from '../types';
import axios from 'axios';

interface RoomResponse {
  id: number;
  image: string;
  name: string;
  room_description: string;
  gallery_visible: boolean;
}

function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    axios
      .get<RoomResponse[]>(
        'https://x8ki-letl-twmt.n7.xano.io/api:VprH3nkO/room'
      )
      .then((response) => {
        // Map API response directly to GalleryImage type
        const galleryData: GalleryImage[] = response.data.map((item) => ({
          id: item.id,
          image: item.image,
          title: item.name,
          description: item.room_description,
          isVisible: item.gallery_visible,
        }));
        setImages(galleryData);
      })
      .catch((error) => {
        console.error('Error fetching gallery images:', error);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter only visible images
  const visibleImages = useMemo(
    () => images.filter((img) => img.isVisible),
    [images]
  );

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  // Map visible images for carousel
  const slides = visibleImages.map(({ image, title, description }) => ({
    image,
    title,
    description,
  }));

  return (
    <div className="container pt-5">
      <div className="content-container row">
        <h1 className="mb-4 fw-bold">Our Gallery</h1>
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : visibleImages.length === 0 ? (
          <p className="text-muted">There are no images to display.</p>
        ) : (
          <ControlledCarousel
            slides={slides}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        )}
      </div>
      <div className="row mt-5">
        {visibleImages.map((imageItem, i) => (
          <div
            className="col-6 col-md-3 col-lg-2 g-3 d-flex justify-content-start"
            key={imageItem.id}
          >
            <GalleryThumbnail
              image={imageItem.image}
              isSelected={activeIndex === i}
              onClick={() => handleSelect(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
