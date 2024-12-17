import { Card } from '../atoms/Card';
import { GoalSettingForm } from '../molecules/GoalSettingForm';

interface GoalSettingSectionProps {
  currentGoals: {
    weekly: number;
    monthly: number;
  };
  progress: {
    weekly: number;
    monthly: number;
  };
  onUpdateGoals: (goals: { weekly: number; monthly: number }) => void;
}

export const GoalSettingSection = ({
  currentGoals,
  progress,
  onUpdateGoals,
}: GoalSettingSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <h2 className="text-xl font-bold mb-4">目標の進捗</h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span>週間目標</span>
              <span>
                {progress.weekly} / {currentGoals.weekly}
              </span>
            </div>
            <progress
              className="progress progress-primary w-full"
              value={progress.weekly}
              max={currentGoals.weekly}
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span>月間目標</span>
              <span>
                {progress.monthly} / {currentGoals.monthly}
              </span>
            </div>
            <progress
              className="progress progress-secondary w-full"
              value={progress.monthly}
              max={currentGoals.monthly}
            />
          </div>
        </div>
      </Card>
      <div>
        <h2 className="text-xl font-bold mb-4">目標の設定</h2>
        <GoalSettingForm
          onSubmit={onUpdateGoals}
          initialValues={currentGoals}
        />
      </div>
    </div>
  );
};
