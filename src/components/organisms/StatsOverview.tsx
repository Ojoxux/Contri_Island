import { StatsCard } from '../molecules/StatsCard';

interface StatsOverviewProps {
  stats: {
    daily: number;
    weekly: number;
    monthly: number;
    total: number;
    trends: {
      weekly: number;
      monthly: number;
    };
  };
}

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="今日のコントリビューション"
        value={stats.daily}
        icon="activity"
      />
      <StatsCard
        title="週間コントリビューション"
        value={stats.weekly}
        icon="calendar"
        trend={{
          value: stats.trends.weekly,
          isPositive: stats.trends.weekly > 0,
        }}
      />
      <StatsCard
        title="月間コントリビューション"
        value={stats.monthly}
        icon="bar-chart"
        trend={{
          value: stats.trends.monthly,
          isPositive: stats.trends.monthly > 0,
        }}
      />
      <StatsCard
        title="総コントリビューション"
        value={stats.total}
        icon="award"
      />
    </div>
  );
};
