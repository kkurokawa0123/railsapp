import { createContext, useContext } from 'react';

export type LoadingContextType = {
  openLoading: () => void;
  closeLoading: () => void;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoadingContext must be used within LoadingProvider');
  }
  return context;
};
