import { ReactNode } from 'react';
import { DashboardHeader } from '../organisms/DashboardHeader';

interface MainLayoutProps {
  children: ReactNode;
  user?: {
    name: string;
    avatarUrl: string;
  };
  onLogout?: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export const MainLayout = ({
  children,
  user,
  onLogout = () => {},
  onThemeToggle,
  isDarkMode,
}: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-acnh-green-light/30 to-acnh-mint/20">
      {user && (
        <DashboardHeader
          user={user}
          onLogout={onLogout}
          onThemeToggle={onThemeToggle}
          isDarkMode={isDarkMode}
        />
      )}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
};
