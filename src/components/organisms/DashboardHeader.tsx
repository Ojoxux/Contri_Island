import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';
import { Link, useLocation } from 'react-router-dom';

interface DashboardHeaderProps {
  user: {
    name: string;
    avatarUrl: string;
  };
  onLogout: () => void;
  onThemeToggle: () => void;
  isDarkMode: boolean;
}

export const DashboardHeader = ({
  user,
  onLogout,
  onThemeToggle,
  isDarkMode,
}: DashboardHeaderProps) => {
  const location = useLocation();

  return (
    <header className="navbar bg-white/90 shadow-acnh border-b-2 border-acnh-green px-4">
      <div className="flex-1">
        <Link to="/dashboard" className="text-xl font-bold text-acnh-brown">
          GitHub Contribution Island
        </Link>
      </div>
      <div className="flex-none gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onThemeToggle}
          className="btn-circle text-acnh-brown hover:bg-acnh-green/10"
        >
          <Icon name={isDarkMode ? 'sun' : 'moon'} />
        </Button>
        <div className="dropdown dropdown-end">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle avatar border-2 border-acnh-green"
          >
            <div className="w-10 rounded-full">
              <img src={user.avatarUrl} alt={user.name} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow-acnh menu menu-sm dropdown-content bg-white/90 rounded-acnh border-2 border-acnh-green w-52"
          >
            <li>
              <Link
                to="/dashboard"
                className={`${
                  location.pathname === '/dashboard' ? 'bg-acnh-green/10' : ''
                } text-acnh-brown hover:bg-acnh-green/10`}
              >
                ダッシュボード
                <Icon name="layout-dashboard" size={16} />
              </Link>
            </li>
            <li>
              <Link
                to="/island"
                className={`${
                  location.pathname === '/island' ? 'bg-acnh-green/10' : ''
                } text-acnh-brown hover:bg-acnh-green/10`}
              >
                島を見る
                <Icon name="palm-tree" size={16} />
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`${
                  location.pathname === '/settings' ? 'bg-acnh-green/10' : ''
                } text-acnh-brown hover:bg-acnh-green/10`}
              >
                設定
                <Icon name="settings" size={16} />
              </Link>
            </li>
            <li>
              <a onClick={onLogout} className="text-error hover:bg-error/10">
                ログアウト
                <Icon name="log-out" size={16} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};
