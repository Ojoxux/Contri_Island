import { FormEvent } from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Card } from '../atoms/Card';

interface GoalSettingFormProps {
  onSubmit: (goal: { weekly: number; monthly: number }) => void;
  initialValues?: {
    weekly?: number;
    monthly?: number;
  };
}

export const GoalSettingForm = ({
  onSubmit,
  initialValues = {},
}: GoalSettingFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      weekly: Number(formData.get('weekly')),
      monthly: Number(formData.get('monthly')),
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="週間目標"
          name="weekly"
          type="number"
          min="1"
          defaultValue={initialValues.weekly}
          placeholder="週間のコントリビューション目標"
          required
        />
        <Input
          label="月間目標"
          name="monthly"
          type="number"
          min="1"
          defaultValue={initialValues.monthly}
          placeholder="月間のコントリビューション目標"
          required
        />
        <Button type="submit" className="w-full">
          目標を設定
        </Button>
      </form>
    </Card>
  );
};
