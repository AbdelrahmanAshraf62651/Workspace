import { type FC } from 'react';
import Carousel from 'react-bootstrap/Carousel';

interface ControlledCarouselProps {
  slides: { img: string; title: string; description: string }[];
  activeIndex: number;
  onSelect: (selectedIndex: number) => void;
}

const ControlledCarousel: FC<ControlledCarouselProps> = ({
  slides,
  activeIndex,
  onSelect,
}) => {
  return (
    <Carousel activeIndex={activeIndex} onSelect={onSelect} interval={3000}>
      {slides.map((slide, i) => (
        <Carousel.Item key={i}>
          <img
            style={{
              maxHeight: '600px',
              width: '100%',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              borderRadius: '10px',
            }}
            src={slide.img}
            alt={`Slide ${i + 1}`}
          />
          <Carousel.Caption>
            <h3 className="fw-bold fs-sm-5">{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ControlledCarousel;
