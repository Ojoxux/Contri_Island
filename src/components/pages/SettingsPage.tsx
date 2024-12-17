import { MainLayout } from '../templates/MainLayout';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';

interface SettingsPageProps {
  user: {
    name: string;
    avatarUrl: string;
  };
  onLogout: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
  onResetProgress: () => void;
  onDeleteAccount: () => void;
}

export const SettingsPage = ({
  user,
  onLogout,
  onThemeToggle,
  isDarkMode,
  onResetProgress,
  onDeleteAccount,
}: SettingsPageProps) => {
  return (
    <MainLayout
      user={user}
      onLogout={onLogout}
      onThemeToggle={onThemeToggle}
      isDarkMode={isDarkMode}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">アカウント設定</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">テーマ設定</h3>
              <Button
                variant="secondary"
                onClick={onThemeToggle}
                className="w-full"
              >
                {isDarkMode ? 'ライトモード' : 'ダークモード'}に切り替え
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">データ管理</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">進捗のリセット</h3>
              <Button
                variant="accent"
                onClick={onResetProgress}
                className="w-full"
              >
                すべての進捗をリセット
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4 text-error">危険な操作</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">アカウントの削除</h3>
              <Button
                variant="ghost"
                onClick={onDeleteAccount}
                className="w-full text-error hover:bg-error hover:text-error-content"
              >
                アカウントを完全に削除
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};
