import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { LandingPage } from './components/pages/LandingPage';
import { DashboardPage } from './components/pages/DashboardPage';
import { SettingsPage } from './components/pages/SettingsPage';
import { useAuth } from './contexts/AuthContext';

const AppRoutes = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { user, login, logout } = useAuth();

  const mockGoals = {
    weekly: 30,
    monthly: 100,
  };

  const mockProgress = {
    weekly: 25,
    monthly: 87,
  };

  const handleThemeToggle = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.setAttribute(
      'data-theme',
      !isDarkMode ? 'dark' : 'light'
    );
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Routes>
        <Route
          path="/"
          element={
            <LandingPage
              onThemeToggle={handleThemeToggle}
              isDarkMode={isDarkMode}
              onLogin={login}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage
                user={user!}
                goals={mockGoals}
                progress={mockProgress}
                onLogout={logout}
                onUpdateGoals={() => {}}
                onThemeToggle={handleThemeToggle}
                isDarkMode={isDarkMode}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage
                user={user!}
                onLogout={logout}
                onThemeToggle={handleThemeToggle}
                isDarkMode={isDarkMode}
                onResetProgress={() => {}}
                onDeleteAccount={() => {}}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
