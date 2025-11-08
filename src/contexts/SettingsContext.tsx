import { createContext, useContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  opacity: number;
  intensity: number;
  backgroundImage: string;
  setOpacity: (value: number) => void;
  setIntensity: (value: number) => void;
  setBackgroundImage: (value: string) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [opacity, setOpacityState] = useState(() => {
    const saved = localStorage.getItem('bg_opacity');
    return saved ? parseFloat(saved) : 0.3;
  });

  const [intensity, setIntensityState] = useState(() => {
    const saved = localStorage.getItem('bg_intensity');
    return saved ? parseFloat(saved) : 1;
  });

  const [backgroundImage, setBackgroundImageState] = useState(() => {
    const saved = localStorage.getItem('bg_image');
    return saved || 'default';
  });

  const setOpacity = (value: number) => {
    setOpacityState(value);
    localStorage.setItem('bg_opacity', value.toString());
  };

  const setIntensity = (value: number) => {
    setIntensityState(value);
    localStorage.setItem('bg_intensity', value.toString());
  };

  const setBackgroundImage = (value: string) => {
    setBackgroundImageState(value);
    localStorage.setItem('bg_image', value);
  };

  return (
    <SettingsContext.Provider value={{ opacity, intensity, backgroundImage, setOpacity, setIntensity, setBackgroundImage }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
};
