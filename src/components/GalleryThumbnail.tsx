import React from 'react';

interface GalleryThumbnailProps {
  img: string;
  isSelected: boolean;
  onClick: () => void;
}

const GalleryThumbnail: React.FC<GalleryThumbnailProps> = ({
  img,
  isSelected,
  onClick,
}) => {
  return (
    <img
      src={img}
      alt="Thumbnail"
      className={`thumbnail img-fluid shadow-sm rounded ${
        isSelected ? 'active' : ''
      }`}
      onClick={onClick}
      style={
        isSelected
          ? {
              transition: 'all 0.4s ease-in-out',
              border: '3px solid black',
              cursor: 'pointer',
            }
          : {
              transition: 'all 0.4s ease-in-out',
              cursor: 'pointer',
            }
      }
    />
  );
};

export default GalleryThumbnail;
