import { Icon } from '../atoms/Icon';
import { acnhColors } from '../../styles/colors';

interface NavigationBarProps {
  onSettingsClick: () => void;
}

export const NavigationBar = ({ onSettingsClick }: NavigationBarProps) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 rounded-t-3xl shadow-lg"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderTop: `2px solid ${acnhColors.brown}`,
        boxShadow: '0 -4px 10px rgba(139, 69, 19, 0.2)',
        backdropFilter: 'blur(10px)',
        padding: '12px 0 8px 0',
      }}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-around items-center">
          {/* ホームボタン */}
          <button
            className="flex flex-col items-center gap-1 transform transition-transform hover:scale-110"
            style={{
              transition: 'transform 0.2s ease',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: acnhColors.primary,
                boxShadow: `0 2px 4px ${acnhColors.shadow}`,
              }}
            >
              <Icon
                name="home"
                size={24}
                style={{
                  color: acnhColors.white,
                }}
              />
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: acnhColors.brown }}
            >
              ホーム
            </span>
          </button>

          {/* 統計ボタン */}
          <button
            className="flex flex-col items-center gap-1 transform transition-transform hover:scale-110"
            style={{
              transition: 'transform 0.2s ease',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: acnhColors.secondary,
                boxShadow: `0 2px 4px ${acnhColors.shadow}`,
              }}
            >
              <Icon
                name="bar-chart"
                size={24}
                style={{
                  color: acnhColors.white,
                }}
              />
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: acnhColors.brown }}
            >
              統計
            </span>
          </button>

          {/* 設定ボタン */}
          <button
            className="flex flex-col items-center gap-1 transform transition-transform hover:scale-110"
            onClick={onSettingsClick}
            style={{
              transition: 'transform 0.2s ease',
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: acnhColors.blue,
                boxShadow: `0 2px 4px ${acnhColors.shadow}`,
              }}
            >
              <Icon
                name="settings"
                size={24}
                style={{
                  color: acnhColors.white,
                }}
              />
            </div>
            <span
              className="text-xs font-medium"
              style={{ color: acnhColors.brown }}
            >
              設定
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
