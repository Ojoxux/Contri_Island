import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LandingPage } from './components/pages/LandingPage';
import { IslandPage } from './components/pages/IslandPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';

const AppRoutes = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { login, user, logout, loading, initialized } = useAuth();

  const handleLogin = async () => {
    try {
      await login();
    } catch (error) {
      console.error('ログインエラー:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('ログアウトエラー:', error);
    }
  };

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 初期化前またはローディング中は待機
  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-acnh-beige">
        <div className="loading loading-spinner loading-lg text-acnh-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route
          path="/"
          element={
            user && user.name && user.avatarUrl ? (
              <Navigate to="/island" replace />
            ) : (
              <LandingPage
                onLogin={handleLogin}
                onThemeToggle={handleThemeToggle}
                isDarkMode={isDarkMode}
                isLoading={loading}
              />
            )
          }
        />
        <Route
          path="/island"
          element={
            <ProtectedRoute>
              <IslandPage
                user={user!}
                onLogout={handleLogout}
                onThemeToggle={handleThemeToggle}
                isDarkMode={isDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
