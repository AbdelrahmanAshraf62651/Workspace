import ControlledCarousel from '../components/ControlledCarousel';
import GalleryThumbnail from '../components/GalleryThumbnail';
import { useState, useMemo } from 'react';
import { useGallery } from '../contexts/GalleryContext';

function Gallery() {
  const { images } = useGallery();
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter only visible images
  const visibleImages = useMemo(() => {
    return images.filter((img) => img.isVisible);
  }, [images]);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  // Prepare slides for carousel (only img, title, description)
  const slides = visibleImages.map((img) => ({
    img: img.img,
    title: img.title,
    description: img.description,
  }));

  return (
    <div className="container pt-5">
      <div className="content-container row">
        <h1 className="mb-4 fw-bold">Our Gallery</h1>
        {visibleImages.length > 0 && (
          <ControlledCarousel
            slides={slides}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />
        )}
      </div>
      <div className="row mt-5">
        {visibleImages.map((image, i) => (
          <div
            className="col-6 col-md-3 col-lg-2 g-3 d-flex justify-content-start"
            key={image.id}
          >
            <GalleryThumbnail
              img={image.img}
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