import { MainLayout } from '../templates/MainLayout';
import { GitHubLoginButton } from '../molecules/GitHubLoginButton';
import { Card } from '../atoms/Card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useEffect } from 'react';

interface LandingPageProps {
  onLogin: () => Promise<void>;
  isLoading?: boolean;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export const LandingPage = ({
  onLogin,
  isLoading = false,
  onThemeToggle,
  isDarkMode,
}: LandingPageProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      await onLogin();
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <MainLayout onThemeToggle={onThemeToggle} isDarkMode={isDarkMode}>
      <div className="min-h-[80vh] flex items-center justify-center">
        <Card className="max-w-lg w-full text-center">
          <h1 className="text-4xl font-bold mb-4">
            GitHub Contribution Island
          </h1>
          <p className="text-lg mb-8 text-base-content/70">
            あなたのGitHubコントリビューションを美しい3D島として可視化し、
            学習モチベーションを高めましょう。
          </p>
          <GitHubLoginButton onClick={handleLogin} isLoading={isLoading} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <h3 className="font-bold mb-2">3D可視化</h3>
              <p className="text-sm text-base-content/70">
                コントリビューションを美しい3D島として表示
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-2">目標設定</h3>
              <p className="text-sm text-base-content/70">
                週間・月間の目標を設定して進捗を管理
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-bold mb-2">カスタマイズ</h3>
              <p className="text-sm text-base-content/70">
                島のデザインやテーマをカスタマイズ
              </p>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};
