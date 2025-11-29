import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string; // ISO date string
  isRead: boolean;
}

interface ContactMessagesContextType {
  messages: ContactMessage[];
  markAsRead: (id: number) => void;
  markAsUnread: (id: number) => void;
  deleteMessage: (id: number) => void;
  addMessage: (message: Omit<ContactMessage, 'id'>) => void;
}

const ContactMessagesContext = createContext<ContactMessagesContextType | undefined>(undefined);

const MESSAGES_KEY = 'workspace_contact_messages';

export function ContactMessagesProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const loadMessages = () => {
      try {
        const storedMessages = localStorage.getItem(MESSAGES_KEY);
        if (storedMessages) {
          const parsedMessages = JSON.parse(storedMessages) as ContactMessage[];
          setMessages(parsedMessages);
        } else {
          // ✅ INITIAL SAMPLE MESSAGES (from your mockup)
          const initialMessages: ContactMessage[] = [
            {
              id: 1,
              name: 'Alice Johnson',
              email: 'alice.johnson@example.com',
              subject: 'Inquiry about booking a private event',
              message: 'Hello, I\'m interested in booking your conference room for a private corporate event next month. Can you please provide availability and pricing for 20 people?',
              receivedAt: '2025-10-20T09:30:00Z',
              isRead: false
            },
            {
              id: 2,
              name: 'Bob Williams',
              email: 'bob.williams@example.com',
              subject: 'Feedback on recent gallery update',
              message: 'Great job on the new gallery photos! The room images look professional and help with decision making.',
              receivedAt: '2025-10-20T17:15:00Z',
              isRead: true
            },
            {
              id: 3,
              name: 'Charlie Brown',
              email: 'charlie.brown@example.com',
              subject: 'Issue with payment processing',
              message: 'I tried to complete a booking but the payment keeps failing. I\'m using Visa card ending in 1234.',
              receivedAt: '2025-10-21T08:45:00Z',
              isRead: false
            },
            {
              id: 4,
              name: 'Diana Prince',
              email: 'diana.prince@example.com',
              subject: 'Question about cafe menu',
              message: 'Do you offer gluten-free options in your cafe? Planning a team meeting and need dietary accommodations.',
              receivedAt: '2025-10-21T10:20:00Z',
              isRead: true
            },
            {
              id: 5,
              name: 'Eve Adams',
              email: 'eve.adams@example.com',
              subject: 'General question about opening hours',
              message: 'What are your operating hours on weekends? Planning to visit with my team for room tour.',
              receivedAt: '2025-10-21T11:30:00Z',
              isRead: true
            },
            {
              id: 6,
              name: 'Frank Miller',
              email: 'frank.miller@example.com',
              subject: 'Room availability for next week',
              message: 'Need a conference room for Wednesday next week, 2-5 PM. Available?',
              receivedAt: '2025-10-22T14:10:00Z',
              isRead: false
            }
          ];
          setMessages(initialMessages);
          localStorage.setItem(MESSAGES_KEY, JSON.stringify(initialMessages));
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };

    loadMessages();
  }, []);
  useEffect(() => {
    //  static initial messages
    const initialMessages = [
      {
        id: 1,
        name: "Alice Johnson",
        email: "alice@example.com",
        subject: "Room booking inquiry",
        message: "I want to book a conference room for next Friday.",
        receivedAt: "2025-11-28T10:30:00Z",
        isRead: false  
      },
      {
        id: 2,
        name: "Bob Wilson",
        email: "bob@example.com",
        subject: "Payment issue",
        message: "My payment didn't go through for room 101.",
        receivedAt: "2025-11-28T14:15:00Z",
        isRead: false  
      },
      {
        id: 3,
        name: "Carol Davis",
        email: "carol@example.com",
        subject: "Great service!",
        message: "Thank you for the excellent room service yesterday.",
        receivedAt: "2025-11-27T09:45:00Z",
        isRead: true   
      },
      {
        id: 4,
        name: "David Lee",
        email: "david@example.com",
        subject: "Availability question",
        message: "Are there any rooms available this weekend?",
        receivedAt: "2025-11-28T16:20:00Z",
        isRead: true   
      },
      {
        id: 5,
        name: "Emma Brown",
        email: "emma@example.com",
        subject: "Cafe menu",
        message: "Do you have vegetarian options in the cafe?",
        receivedAt: "2025-11-27T11:10:00Z",
        isRead: true   
      }
    ];
  
    
    setMessages(initialMessages);
    
    
    localStorage.setItem(MESSAGES_KEY, JSON.stringify(initialMessages));
  }, []);

   //   Fetch messages from localStorage on mount
   
//   useEffect(() => {
//     try {
//       localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
//     } catch (error) {
//       console.error('Error saving messages:', error);
//     }
//   }, [messages]);

  const addMessage = (messageData: Omit<ContactMessage, 'id'>) => {
    const newMessage: ContactMessage = {
      id: Date.now(),
      ...messageData,
      isRead: false
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const markAsRead = (id: number) => {
    setMessages(prev => 
      prev.map(msg => msg.id === id ? { ...msg, isRead: true } : msg)
    );
  };

  const markAsUnread = (id: number) => {
    setMessages(prev => 
      prev.map(msg => msg.id === id ? { ...msg, isRead: false } : msg)
    );
  };

  const deleteMessage = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  return (
    <ContactMessagesContext.Provider value={{
      messages,
      markAsRead,
      markAsUnread,
      deleteMessage,
      addMessage
    }}>
      {children}
    </ContactMessagesContext.Provider>
  );
}

export const useContactMessages = () => {
  const context = useContext(ContactMessagesContext);
  if (!context) {
    throw new Error('useContactMessages must be used within ContactMessagesProvider');
  }
  return context;
};