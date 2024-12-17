import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

interface GitHubLoginButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export const GitHubLoginButton = ({
  onClick,
  isLoading = false,
}: GitHubLoginButtonProps) => {
  return (
    <Button onClick={onClick} className="gap-2" disabled={isLoading}>
      {isLoading ? (
        <span className="loading loading-spinner" />
      ) : (
        <Icon name="github" size={20} />
      )}
      GitHubでログイン
    </Button>
  );
};
