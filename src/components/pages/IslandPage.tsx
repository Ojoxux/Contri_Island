import React, { Suspense, useState, useEffect } from 'react';
import { Icon } from '../atoms/Icon';
import { useGitHubStore } from '../../store/useGitHubStore';
import { NavigationBar } from '../molecules/NavigationBar';
import { Modal } from '../molecules/Modal';
import { acnhColors } from '../../styles/colors';
import { DashboardContent } from '../organisms/DashboardContent';
import { SettingsContent } from '../organisms/SettingsContent';
import { ProfileContent } from '../organisms/ProfileContent';
import { User } from '../../contexts/AuthContext';
import { fetchGitHubContributions } from '../../services/github';
import { Scene } from '../Scene';

interface IslandPageProps {
  user: User;
  onLogout: () => Promise<void>;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

interface ContributionData {
  totalContributions: number;
  weeks: {
    contributionDays: {
      contributionCount: number;
      date: string;
      color: string;
    }[];
  }[];
}

export const IslandPage = ({
  user,
  onLogout,
  onThemeToggle,
  isDarkMode,
}: IslandPageProps) => {
  const { userData } = useGitHubStore();
  const [activeModal, setActiveModal] = useState<
    'dashboard' | 'settings' | 'profile' | null
  >(null);
  const [webGLError, setWebGLError] = useState(false);
  const [contributionData, setContributionData] =
    useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // WebGL対応チェック
  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebGLError(true);
      console.error('WebGLがサポートされていません');
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user.accessToken) {
        console.error('アクセストークンが見つかりません:', user);
        setError(new Error('アクセストークンが見つかりません'));
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching contributions with token:', user.accessToken);
        const data = await fetchGitHubContributions(user.accessToken);
        console.log('Fetched contribution data:', data);
        setContributionData(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [user.accessToken]);

  if (webGLError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-acnh-beige">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-acnh-brown mb-4">
            WebGLの初期化に失敗しました
          </h2>
          <p className="text-acnh-brown mb-4">
            ブラウザの設定でWebGLを有効にするか、別のブラウザでお試しください。
          </p>
          <button onClick={onLogout} className="btn btn-primary">
            ログアウト
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-acnh-beige">
        <div className="loading loading-spinner loading-lg text-acnh-green" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-acnh-beige">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-acnh-brown mb-4">
            エラーが発生しました
          </h2>
          <p className="text-acnh-brown mb-4">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-full relative"
      style={{ backgroundColor: acnhColors.beige }}
    >
      {/* 3Dビューワー */}
      <div className="absolute inset-0">
        <ErrorBoundary fallback={<WebGLError onLogout={onLogout} />}>
          <Scene contributionData={contributionData} />
        </ErrorBoundary>
      </div>

      {/* ヘッダー */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center">
        {/* ハッシュボードボタン */}
        <button
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            backgroundColor: acnhColors.primary,
            boxShadow: `0 4px 6px ${acnhColors.shadow}`,
          }}
          onClick={() => setActiveModal('dashboard')}
        >
          <Icon
            name="layout-grid"
            size={24}
            stroke={acnhColors.white}
            strokeWidth={2}
          />
        </button>

        {/* ユーザーアイコン */}
        <button
          className="w-12 h-12 rounded-full overflow-hidden"
          style={{ boxShadow: `0 4px 6px ${acnhColors.shadow}` }}
          onClick={() => setActiveModal('profile')}
        >
          <img
            src={user.avatarUrl}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {/* タイトル */}
      <div
        className="absolute top-24 left-1/2 transform -translate-x-1/2 text-4xl font-bold"
        style={{ color: acnhColors.brown }}
      >
        Island
      </div>

      {/* ナビゲーションバー */}
      <NavigationBar onSettingsClick={() => setActiveModal('settings')} />

      {/* モーダル */}
      <Modal
        isOpen={activeModal === 'dashboard'}
        onClose={() => setActiveModal(null)}
        title="ダッシュボード"
      >
        <DashboardContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'settings'}
        onClose={() => setActiveModal(null)}
        title="設定"
      >
        <SettingsContent />
      </Modal>

      <Modal
        isOpen={activeModal === 'profile'}
        onClose={() => setActiveModal(null)}
        title="プロフィール"
      >
        <ProfileContent />
      </Modal>
    </div>
  );
};

// WebGLエラー表示コンポーネント
const WebGLError = ({ onLogout }: { onLogout: () => void }) => (
  <div className="flex items-center justify-center h-full p-4 bg-acnh-beige">
    <div className="text-center">
      <h3 className="text-2xl font-bold text-acnh-brown mb-4">
        WebGLの初期化に失敗しました
      </h3>
      <p className="text-acnh-brown mb-4">
        ブラウザの設定でWebGLを有効にするか、別のブラウザでお試しください。
      </p>
      <button onClick={onLogout} className="btn btn-primary">
        ログアウト
      </button>
    </div>
  </div>
);

// エラーバウンダリーコンポーネント
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}
