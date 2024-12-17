import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

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
  return (
    <header className="navbar bg-base-200 shadow-lg px-4">
      <div className="flex-1">
        <h1 className="text-xl font-bold">GitHub Contribution Island</h1>
      </div>
      <div className="flex-none gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={onThemeToggle}
          className="btn-circle"
        >
          <Icon name={isDarkMode ? 'sun' : 'moon'} />
        </Button>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user.avatarUrl} alt={user.name} />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                プロフィール
                <Icon name="user" size={16} />
              </a>
            </li>
            <li>
              <a className="justify-between">
                設定
                <Icon name="settings" size={16} />
              </a>
            </li>
            <li>
              <a onClick={onLogout} className="text-error">
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
