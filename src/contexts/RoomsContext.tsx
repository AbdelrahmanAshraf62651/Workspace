import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Room {
  id: string;
  name: string;
  title: string;
  type: string;
  description: string | null;
  image: string | null;
  capacity: number;
  hourlyRate: number;
  status: 'Available' | 'Booked' | 'Maintenance';
}

interface RoomsContextType {
  rooms: Room[];
  addRoom: (roomData: Omit<Room, 'id' | 'status'>) => Promise<void>;
  updateRoom: (id: string, roomData: Partial<Room>) => Promise<void>;
  deleteRoom: (id: string) => Promise<void>;
  toggleRoomStatus: (id: string, currentStatus: Room['status']) => void;
}

const RoomsContext = createContext<RoomsContextType | undefined>(undefined);

const ROOMS_KEY = 'workspace_rooms';

export function RoomsProvider({ children }: { children: ReactNode }) {
  const [rooms, setRooms] = useState<Room[]>([]);

  
  useEffect(() => {
    const loadRooms = () => {
      try {
        const storedRooms = localStorage.getItem(ROOMS_KEY);
        if (storedRooms) {
          const parsedRooms = JSON.parse(storedRooms) as Room[];
          setRooms(parsedRooms);
        } else {
          
          const initialRooms: Room[] = [
            {
              id: '1',
              name: 'Executive Suite 101',
              title: 'Executive Suite',          
              type: 'Suite',
              description: 'Luxury executive suite with premium amenities',  
              image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',  
              capacity: 2,
              hourlyRate: 120,
              status: 'Available',
            },
            {
              id: '2',
              name: 'Standard Twin 202',
              title: 'Standard Twin Room',         
              type: 'Standard',
              description: 'Comfortable twin room for two guests',  
              image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',  
              capacity: 2,
              hourlyRate: 50,
              status: 'Available',
            },
            {
              id: '3',
              name: 'Deluxe Queen 303',
              title: 'Deluxe Queen Room',          
              type: 'Deluxe',
              description: 'Spacious room with queen bed and modern decor',  
              image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',  
              capacity: 2,
              hourlyRate: 80,
              status: 'Booked',
            },
            {
              id: '4',
              name: 'Conference Room Alpha',
              title: 'Conference Room Alpha',     
              type: 'Conference',
              description: 'Professional conference room for up to 10 people',  
              image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',  
              capacity: 10,
              hourlyRate: 150,
              status: 'Available',
            },
            {
              id: '5',
              name: 'Family Suite 501',
              title: 'Family Suite',              
              type: 'Suite',
              description: 'Spacious family suite with multiple bedrooms',  
              image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',  
              capacity: 4,
              hourlyRate: 180,
              status: 'Maintenance',
            }
          ];
          setRooms(initialRooms);
          localStorage.setItem(ROOMS_KEY, JSON.stringify(initialRooms));
        }
      } catch (error) {
        console.error('Error loading rooms:', error);
        
        const initialRooms: Room[] = [
          { id: '1',
            name: 'Executive Suite 101',
            title: 'Executive Suite',           
            type: 'Suite',
            description: 'Luxury executive suite with premium amenities',  
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',  
            capacity: 2,
            hourlyRate: 120,
            status: 'Available' }
        ];
        setRooms(initialRooms);
        localStorage.setItem(ROOMS_KEY, JSON.stringify(initialRooms));
      }
    };

    loadRooms();
  }, []);

  useEffect(() => {
    
    const loadRooms = () => {
      try {
        //  FORCE CLEAR corrupted data
        localStorage.removeItem(ROOMS_KEY);
        
        // CREATE INITIAL ROOMS
        const initialRooms: Room[] = [
          {
            id: '1',
            name: 'Executive Suite 101',
            title: 'Executive Suite',          
            type: 'Suite',
            description: 'Luxury executive suite with premium amenities',  
            image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop',  
            capacity: 2,
            hourlyRate: 120,
            status: 'Available',
          },
          {
            id: '2',
            name: 'Standard Twin 202',
            title: 'Standard Twin Room',         
            type: 'Standard',
            description: 'Comfortable twin room for two guests',  
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',  
            capacity: 2,
            hourlyRate: 50,
            status: 'Available',
          },
          {
            id: '3',
            name: 'Deluxe Queen 303',
            title: 'Deluxe Queen Room',          
            type: 'Deluxe',
            description: 'Spacious room with queen bed and modern decor',  
            image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop',  
            capacity: 2,
            hourlyRate: 80,
            status: 'Booked',
          },
          {
            id: '4',
            name: 'Conference Room Alpha',
            title: 'Conference Room Alpha',     
            type: 'Conference',
            description: 'Professional conference room for up to 10 people',  
            image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',  
            capacity: 10,
            hourlyRate: 150,
            status: 'Available',
          },
          {
            id: '5',
            name: 'Family Suite 501',
            title: 'Family Suite',              
            type: 'Suite',
            description: 'Spacious family suite with multiple bedrooms',  
            image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',  
            capacity: 4,
            hourlyRate: 180,
            status: 'Maintenance',
          }
        ];
  
        
        setRooms(initialRooms);
        
        
        // SAVE TO LOCALSTORAGE
        localStorage.setItem(ROOMS_KEY, JSON.stringify(initialRooms));
    
        
      } catch (error) {
        console.error(' CRITICAL ERROR:', error);
      }
    };
  
    loadRooms();
  }, []); 

  const addRoom = async (roomData: Omit<Room, 'id' | 'status'>): Promise<void> => {
    try {
      const newRoom: Room = {
        id: Date.now().toString(), 
        ...roomData,
        status: 'Available' as const
      };
      
      setRooms(prev => [...prev, newRoom]);
      return Promise.resolve();
    } catch (error) {
      console.error('Error adding room:', error);
      throw error;
    }
  };

  const updateRoom = async (id: string, roomData: Partial<Room>): Promise<void> => {
    try {
      setRooms(prev => 
        prev.map(room => 
          room.id === id ? { ...room, ...roomData } : room
        )
      );
      return Promise.resolve();
    } catch (error) {
      console.error('Error updating room:', error);
      throw error;
    }
  };

  const deleteRoom = async (id: string): Promise<void> => {
    try {
      setRooms(prev => prev.filter(room => room.id !== id));
      return Promise.resolve();
    } catch (error) {
      console.error('Error deleting room:', error);
      throw error;
    }
  };

  const toggleRoomStatus = (id: string, currentStatus: Room['status']) => {
    let newStatus: Room['status'];
    
    switch (currentStatus) {
      case 'Available':
        newStatus = 'Booked';
        break;
      case 'Booked':
        newStatus = 'Maintenance';
        break;
      case 'Maintenance':
        newStatus = 'Available';
        break;
      default:
        newStatus = 'Available';
    }
    
    updateRoom(id, { status: newStatus });
  };

  return (
    <RoomsContext.Provider value={{ 
      rooms, 
      addRoom, 
      updateRoom, 
      deleteRoom, 
      toggleRoomStatus 
    }}>
      {children}
    </RoomsContext.Provider>
  );
}

export const useRooms = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error('useRooms must be used within RoomsProvider');
  }
  return context;
};