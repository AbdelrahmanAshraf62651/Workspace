import ControlledCarousel from '../components/ControlledCarousel';
import GalleryThumbnail from '../components/GalleryThumbnail';

import galleryImg1 from '../assets/images/gallery/1.jpg';
import galleryImg2 from '../assets/images/gallery/2.jpg';
import galleryImg3 from '../assets/images/gallery/3.jpg';
import galleryImg4 from '../assets/images/gallery/4.jpg';
import galleryImg5 from '../assets/images/gallery/5.jpg';
import galleryImg6 from '../assets/images/gallery/6.jpg';
import { useState } from 'react';

const images = [
  {
    img: galleryImg1,
    title: 'Lounge Area',
    description:
      'A bright and airy lounge for informal meetings and networking.',
  },
  {
    img: galleryImg2,
    title: 'Relaxation Zone',
    description:
      'A comfortable space to unwind and recharge with a cup of coffee.',
  },
  {
    img: galleryImg3,
    title: 'Event Space',
    description:
      'Flexible event space perfect for workshops, meetups, and presentations.',
  },
  {
    img: galleryImg6,
    title: 'Private Offices',
    description:
      'Dedicated private offices for teams of all sizes, ensuring privacy and focus.',
  },
  {
    img: galleryImg5,
    title: 'Collaborative Hub',
    description:
      'Our vibrant co-working space designed to foster creativity and collaboration among members.',
  },
  {
    img: galleryImg4,
    title: 'Outdoor Patio',
    description:
      'Enjoy a breath of fresh air and a change of scenery on our outdoor patio.',
  },
];

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="container pt-5">
      <div className="content-container row">
        <h1 className="mb-4 fw-bold">Our Gallery</h1>
        <ControlledCarousel
          slides={images}
          activeIndex={activeIndex}
          onSelect={handleSelect}
        />
      </div>
      <div className="row mt-5">
        {images.map((image, i) => (
          <div
            className="col-6 col-md-3 col-lg-2 g-3 d-flex justify-content-start"
            key={i}
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
