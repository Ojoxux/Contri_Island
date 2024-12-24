import React, { useEffect, useState } from 'react';
import { useGitHubStore } from '../../store/useGitHubStore';
import { acnhColors } from '../../styles/colors';
import { Icon } from '../atoms/Icon';

export const ProfileContent = () => {
  const { userData, loading, error, fetchUserData } = useGitHubStore();
  const [authAttempted, setAuthAttempted] = useState(false);

  useEffect(() => {
    const initializeData = async () => {
      if (authAttempted || userData || loading) return;

      try {
        setAuthAttempted(true);
        await fetchUserData();
      } catch (err) {
        console.error('Failed to initialize GitHub data:', err);
      }
    };

    initializeData();
  }, [userData, loading, fetchUserData, authAttempted]);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラーが発生しました: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      {/* プロフィールヘッダー */}
      <div className="flex items-center gap-4">
        <img
          src={userData?.avatarUrl}
          alt="Profile"
          className="w-20 h-20 rounded-full"
          style={{ border: `3px solid ${acnhColors.primary}` }}
        />
        <div>
          <h3 className="text-xl font-bold" style={{ color: acnhColors.brown }}>
            {userData?.name}
          </h3>
          <p className="text-sm" style={{ color: acnhColors.brown }}>
            @{userData?.login}
          </p>
        </div>
      </div>

      {/* プロフィール情報 */}
      <div className="space-y-4">
        {userData?.bio && (
          <p className="text-sm" style={{ color: acnhColors.brown }}>
            {userData.bio}
          </p>
        )}

        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Icon
              name="users"
              style={{ color: acnhColors.blue }}
              className="w-5 h-5"
            />
            <span className="text-sm" style={{ color: acnhColors.brown }}>
              {userData?.followers} フォロワー
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon
              name="user-plus"
              style={{ color: acnhColors.blue }}
              className="w-5 h-5"
            />
            <span className="text-sm" style={{ color: acnhColors.brown }}>
              {userData?.following} フォロー中
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Icon
            name="book"
            style={{ color: acnhColors.primary }}
            className="w-5 h-5"
          />
          <span className="text-sm" style={{ color: acnhColors.brown }}>
            {userData?.publicRepos} パブリックリポジトリ
          </span>
        </div>
      </div>
    </div>
  );
};
