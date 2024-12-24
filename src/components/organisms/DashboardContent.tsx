import React from 'react';
import { useGitHubStore } from '../../store/useGitHubStore';
import { useIslandStore } from '../../store/useIslandStore';
import { Icon } from '../atoms/Icon';
import { acnhColors } from '../../styles/colors';

export const DashboardContent = () => {
  const { stats } = useGitHubStore();
  const { currentLevel, totalContributions } = useIslandStore();

  return (
    <div className="space-y-6">
      {/* 統計情報 */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Icon
            name="star"
            style={{ color: acnhColors.secondary }}
            className="w-6 h-6"
          />
          <div>
            <h3 className="font-medium" style={{ color: acnhColors.brown }}>
              島のレベル
            </h3>
            <p className="text-sm" style={{ color: acnhColors.brown }}>
              Level {currentLevel}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Icon
            name="git-commit"
            style={{ color: acnhColors.primary }}
            className="w-6 h-6"
          />
          <div>
            <h3 className="font-medium" style={{ color: acnhColors.brown }}>
              総コントリビューション
            </h3>
            <p className="text-sm" style={{ color: acnhColors.brown }}>
              {totalContributions}回
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Icon
            name="trending-up"
            style={{ color: acnhColors.blue }}
            className="w-6 h-6"
          />
          <div>
            <h3 className="font-medium" style={{ color: acnhColors.brown }}>
              今週の活動
            </h3>
            <p className="text-sm" style={{ color: acnhColors.brown }}>
              {stats?.weekly || 0}回
            </p>
          </div>
        </div>
      </div>

      {/* レベルアップ情報 */}
      <div className="space-y-4">
        <h3 className="font-medium" style={{ color: acnhColors.brown }}>
          次のレベルまで
        </h3>
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm" style={{ color: acnhColors.brown }}>
              進捗
            </span>
            <span className="text-sm" style={{ color: acnhColors.brown }}>
              {totalContributions} / {(currentLevel + 1) * 30}
            </span>
          </div>
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: acnhColors.white }}
          >
            <div
              className="h-full transition-all duration-300"
              style={{
                backgroundColor: acnhColors.primary,
                width: `${(totalContributions / ((currentLevel + 1) * 30)) * 100}%`,
              }}
            />
          </div>
          <p className="text-sm mt-2" style={{ color: acnhColors.brown }}>
            あと{(currentLevel + 1) * 30 - totalContributions}
            回のコントリビューションでレベルアップ！
          </p>
        </div>
      </div>
    </div>
  );
};
