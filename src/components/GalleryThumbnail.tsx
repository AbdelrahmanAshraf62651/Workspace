import React from 'react';

interface GalleryThumbnailProps {
  image: string;
  isSelected: boolean;
  onClick: () => void;
}

const GalleryThumbnail: React.FC<GalleryThumbnailProps> = ({
  image,
  isSelected,
  onClick,
}) => {
  return (
    <img
      src={image}
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
