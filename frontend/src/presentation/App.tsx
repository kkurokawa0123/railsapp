import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { indigo, pink } from '@mui/material/colors';
import { AuthProvider } from '@/presentation/providers/AuthProvider';
import CommonLayout from '@/presentation/views/common/CommonLayout';
import SignIn from '@/presentation/views/auth/SignIn';
import SignUp from '@/presentation/views/auth/SignUp';
import PasswordChange from '@/presentation/views/auth/PasswordChange';
import { useAuthContex } from '@/presentation/contexts/authContext';

// テーマを作成
const theme = createTheme({
  palette: {
    // プライマリーカラー
    primary: {
      main: indigo[500],
      light: '#757de8',
      dark: '#002984',
    },
    // ついでにセカンダリーカラーも v4 に戻す
    secondary: {
      main: pink[500],
      light: '#ff6090',
      dark: '#b0003a',
    },
  },
});

const queryClient = new QueryClient();

const PrivateRoute = () => {
  const { isLoading, isAuthenticated } = useAuthContex();

  if (isLoading) return;
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CommonLayout>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<SignIn />} />
                <Route path="/passwordchange" element={<PasswordChange />} />
              </Route>
            </Routes>
          </CommonLayout>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
