import { type ReactNode } from 'react';
import { useGetCurrentUser } from '@/queries/hooks/auth/useAuthMutation';
import { AuthContext, type AuthContextType } from '@/presentation/contexts/authContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  console.log('===== AuthProvider render =====');

  const { data, isLoading, isError, error, refetch } = useGetCurrentUser();

  console.log('AuthProvider data:', data);
  console.log('AuthProvider isLoading:', isLoading);
  console.log('AuthProvider isError:', isError);
  console.log('AuthProvider error:', error);

  const value: AuthContextType = {
    user: data,
    isLoading: isLoading,
    isAuthenticated: !!data,
    refetch: refetch,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
