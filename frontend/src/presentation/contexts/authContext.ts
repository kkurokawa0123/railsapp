import { createContext, useContext } from 'react';
// import type { AuthAccount } from '@/shared/outputs/authAccount';
import type { ResponseUserData } from '@/shared/outputs/auth';

export type AuthContextType = {
  user: ResponseUserData | undefined;
  isLoading: boolean;
  isAuthenticated: boolean;
  refetch: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>({} as AuthContextType);

export const useAuthContex = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
