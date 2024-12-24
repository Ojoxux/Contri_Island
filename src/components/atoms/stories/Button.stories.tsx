import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'ghost'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'ボタン',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'ボタン',
    variant: 'secondary',
    size: 'md',
  },
};

export const Accent: Story = {
  args: {
    children: 'ボタン',
    variant: 'accent',
    size: 'md',
  },
};

export const Ghost: Story = {
  args: {
    children: 'ボタン',
    variant: 'ghost',
    size: 'md',
  },
};

export const Small: Story = {
  args: {
    children: 'ボタン',
    variant: 'primary',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'ボタン',
    variant: 'primary',
    size: 'lg',
  },
};
