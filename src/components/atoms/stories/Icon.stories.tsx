import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 16, max: 64, step: 8 },
    },
    name: {
      control: 'select',
      options: ['github', 'star', 'check', 'close'],
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    name: 'github',
    size: 24,
  },
};

export const Large: Story = {
  args: {
    name: 'github',
    size: 48,
  },
};

export const Colored: Story = {
  args: {
    name: 'star',
    size: 24,
    fill: 'gold',
    stroke: 'orange',
  },
};

export const CustomClass: Story = {
  args: {
    name: 'check',
    size: 24,
    className: 'text-green-500',
  },
};
