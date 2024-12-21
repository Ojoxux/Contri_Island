import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, initialized, error } = useAuth();
  const location = useLocation();

  // 初期化前またはローディング中は必ずローディング画面を表示
  if (!initialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-acnh-beige">
        <div className="loading loading-spinner loading-lg text-acnh-green" />
      </div>
    );
  }

  // エラーがある場合
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-acnh-beige">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-acnh-brown mb-4">
            認証エラーが発生しました
          </h2>
          <p className="text-acnh-brown mb-4">{error.message}</p>
          <Navigate to="/" replace />
        </div>
      </div>
    );
  }

  // 未認証の場合は必ずリダイレクト
  if (!user) {
    console.log('未認証のためリダイレクト');
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // ユーザー情報が完全に存在する場合のみ子コンポーネントを表示
  if (user.name && user.avatarUrl && user.uid) {
    return <>{children}</>;
  }

  // ユーザー情報が不完全な場合はローディング表示
  return (
    <div className="min-h-screen flex items-center justify-center bg-acnh-beige">
      <div className="loading loading-spinner loading-lg text-acnh-green" />
    </div>
  );
};
