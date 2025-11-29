import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { AboutSettings } from '../types';

interface AboutContextType {
  settings: AboutSettings;
  updateSettings: (settings: AboutSettings) => void;
}

const AboutContext = createContext<AboutContextType | undefined>(undefined);

const STORAGE_KEY = 'about_settings';

const defaultSettings: AboutSettings = {
  location: {
    address: '123 Innovation Drive, Suite 400, Metropole City, MC 12345',
    city: 'Metropole City',
    country: 'USA',
    mapLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.66717872805!2d31.245493534800627!3d30.061764094951126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145841b80df27891%3A0xf2a201caea65c2b3!2sRamsis%20Square!5e0!3m2!1sen!2seg!4v1755849468072!5m2!1sen!2seg',
  },
  openingHours: {
    monday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
    tuesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
    wednesday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
    thursday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
    friday: { isOpen: true, openTime: '09:00', closeTime: '18:00' },
    saturday: { isOpen: true, openTime: '10:00', closeTime: '17:00' },
    sunday: { isOpen: false, openTime: '09:00', closeTime: '18:00' },
  },
  contact: {
    phone: '(+20) 112-345-6789',
    email: 'contact@example.com',
  },
};

export function AboutProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AboutSettings>(defaultSettings);

  // Load settings from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setSettings(parsed);
      } catch {
        setSettings(defaultSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
      }
    } else {
      setSettings(defaultSettings);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSettings));
    }
  }, []);

  // Save to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: AboutSettings) => {
    setSettings(newSettings);
  };

  return (
    <AboutContext.Provider value={{ settings, updateSettings }}>
      {children}
    </AboutContext.Provider>
  );
}

export function useAbout() {
  const context = useContext(AboutContext);
  if (context === undefined) {
    throw new Error('useAbout must be used within an AboutProvider');
  }
  return context;
}

