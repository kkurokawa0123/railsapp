import { type ReactNode } from 'react';
import { useGetCurrentUser } from '@/queries/hooks/auth/useAuthMutation';
import { AuthContext, type AuthContextType } from '@/presentation/contexts/authContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data, isLoading, refetch } = useGetCurrentUser();

  const value: AuthContextType = {
    authData: data,
    isLoading: isLoading,
    isAuthenticated: !!data,
    refetch: refetch,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
