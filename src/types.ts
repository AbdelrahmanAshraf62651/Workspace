export type Room = {
  id: number;
  name: string;
  capacity: number;
  status: string;
  nextEvent: string;
};

export type GalleryImage = {
  id: number;
  img: string;
  title: string;
  description: string;
  isVisible: boolean;
};