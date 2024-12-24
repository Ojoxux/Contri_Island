import { MainLayout } from '../templates/MainLayout';
import { StatsOverview } from '../organisms/StatsOverview';
import { GoalSettingSection } from '../organisms/GoalSettingSection';
import { Card } from '../atoms/Card';
import { useStore } from '../../store/useStore';
import { useGitHubStore } from '../../store/useGitHubStore';
import { useEffect } from 'react';

interface DashboardPageProps {
  user: {
    name: string;
    avatarUrl: string;
  };
  onLogout: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export const DashboardPage = ({
  user,
  onLogout,
  onThemeToggle,
  isDarkMode,
}: DashboardPageProps) => {
  const { goals, setGoals } = useStore();
  const { stats, loading, error, fetchStats, userData, fetchUserData } =
    useGitHubStore();

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (userData) {
      fetchStats(userData.login);
    }
  }, [userData, fetchStats]);

  if (loading) {
    return (
      <MainLayout
        user={user}
        onLogout={onLogout}
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
      >
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="loading loading-spinner loading-lg" />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout
        user={user}
        onLogout={onLogout}
        onThemeToggle={onThemeToggle}
        isDarkMode={isDarkMode}
      >
        <Card className="max-w-lg mx-auto text-center">
          <h2 className="text-xl font-bold text-error mb-4">
            エラーが発生しました
          </h2>
          <p className="text-base-content/70">{error.message}</p>
        </Card>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      user={user}
      onLogout={onLogout}
      onThemeToggle={onThemeToggle}
      isDarkMode={isDarkMode}
    >
      <div className="space-y-8">
        {stats && <StatsOverview stats={stats} />}
        <div className="h-[500px] bg-base-200 rounded-xl mb-8">
          {/* Three.jsの3D島をここに実装予定 */}
          <div className="flex items-center justify-center h-full text-base-content/70">
            3D Island View Coming Soon...
          </div>
        </div>
        <GoalSettingSection
          currentGoals={goals}
          progress={{
            weekly: stats?.weekly || 0,
            monthly: stats?.monthly || 0,
          }}
          onUpdateGoals={setGoals}
        />
      </div>
    </MainLayout>
  );
};
