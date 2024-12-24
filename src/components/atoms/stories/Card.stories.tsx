import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '../Card';

const meta = {
  title: 'Atoms/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'compact'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: 'カードの内容をここに表示します',
    variant: 'default',
  },
};

export const Bordered: Story = {
  args: {
    children: 'ボーダーのみのカード',
    variant: 'bordered',
  },
};

export const Compact: Story = {
  args: {
    children: 'コンパクトなカード',
    variant: 'compact',
  },
};

export const WithTitle: Story = {
  args: {
    children: (
      <>
        <h2 className="card-title">カードのタイトル</h2>
        <p>カードの内容をここに表示します</p>
      </>
    ),
  },
};
