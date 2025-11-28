import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { GalleryImage } from '../types';

interface GalleryContextType {
  images: GalleryImage[];
  addImage: (image: Omit<GalleryImage, 'id'>) => void;
  updateImage: (id: number, image: Partial<GalleryImage>) => void;
  deleteImage: (id: number) => void;
  toggleVisibility: (id: number) => void;
}

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

const STORAGE_KEY = 'gallery_images';

const defaultImages: GalleryImage[] = [
  {
    id: 1,
    img: '/images/gallery/1.jpg',
    title: 'Lounge Area',
    description:
      'A bright and airy lounge for informal meetings and networking.',
    isVisible: true,
  },
  {
    id: 2,
    img: '/images/gallery/2.jpg',
    title: 'Relaxation Zone',
    description:
      'A comfortable space to unwind and recharge with a cup of coffee.',
    isVisible: true,
  },
  {
    id: 3,
    img: '/images/gallery/3.jpg',
    title: 'Event Space',
    description:
      'Flexible event space perfect for workshops, meetups, and presentations.',
    isVisible: true,
  },
  {
    id: 4,
    img: '/images/gallery/4.jpg',
    title: 'Private Offices',
    description:
      'Dedicated private offices for teams of all sizes, ensuring privacy and focus.',
    isVisible: true,
  },
  {
    id: 5,
    img: '/images/gallery/5.jpg',
    title: 'Collaborative Hub',
    description:
      'Our vibrant co-working space designed to foster creativity and collaboration among members.',
    isVisible: true,
  },
  {
    id: 6,
    img: '/images/gallery/6.jpg',
    title: 'Outdoor Patio',
    description:
      'Enjoy a breath of fresh air and a change of scenery on our outdoor patio.',
    isVisible: true,
  },
];

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<GalleryImage[]>([]);

  // Load images from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setImages(parsed);
      } catch {
        // If parsing fails, use default
        setImages(defaultImages);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
      }
    } else {
      // Initialize with default data
      setImages(defaultImages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
    }
  }, []);

  // Save to localStorage whenever images change
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    }
  }, [images]);

  const addImage = (image: Omit<GalleryImage, 'id'>) => {
    const newId = images.length > 0 ? Math.max(...images.map((img) => img.id)) + 1 : 1;
    const newImage: GalleryImage = {
      ...image,
      id: newId,
    };
    setImages([...images, newImage]);
  };

  const updateImage = (id: number, updatedData: Partial<GalleryImage>) => {
    setImages(
      images.map((img) => (img.id === id ? { ...img, ...updatedData } : img))
    );
  };

  const deleteImage = (id: number) => {
    setImages(images.filter((img) => img.id !== id));
  };

  const toggleVisibility = (id: number) => {
    setImages(
      images.map((img) =>
        img.id === id ? { ...img, isVisible: !img.isVisible } : img
      )
    );
  };

  return (
    <GalleryContext.Provider
      value={{ images, addImage, updateImage, deleteImage, toggleVisibility }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
}