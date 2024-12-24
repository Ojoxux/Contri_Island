import { Card } from '../atoms/Card';
import { Icon } from '../atoms/Icon';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard = ({ title, value, icon, trend }: StatsCardProps) => {
  return (
    <Card variant="compact" className="bg-white/90 border-acnh-green">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-acnh-brown/70">{title}</h3>
          <p className="text-2xl font-bold text-acnh-brown mt-1">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <Icon
                name={trend.isPositive ? 'trend-up' : 'trend-down'}
                className={
                  trend.isPositive ? 'text-acnh-green' : 'text-acnh-pink'
                }
                size={16}
              />
              <span
                className={`text-sm ${
                  trend.isPositive ? 'text-acnh-green' : 'text-acnh-pink'
                }`}
              >
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        <div className="p-3 bg-acnh-green/10 rounded-lg">
          <Icon name={icon} size={24} className="text-acnh-green" />
        </div>
      </div>
    </Card>
  );
};
