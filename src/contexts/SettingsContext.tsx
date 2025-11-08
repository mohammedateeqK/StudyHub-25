import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SettingsContextType {
  opacity: number;
  intensity: number;
  setOpacity: (value: number) => void;
  setIntensity: (value: number) => void;
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

  const setOpacity = (value: number) => {
    setOpacityState(value);
    localStorage.setItem('bg_opacity', value.toString());
  };

  const setIntensity = (value: number) => {
    setIntensityState(value);
    localStorage.setItem('bg_intensity', value.toString());
  };

  return (
    <SettingsContext.Provider value={{ opacity, intensity, setOpacity, setIntensity }}>
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
