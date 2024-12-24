import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: '入力してください',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'メールアドレス',
    placeholder: 'example@example.com',
    type: 'email',
  },
};

export const WithError: Story = {
  args: {
    label: 'パスワード',
    type: 'password',
    error: 'パスワードは8文字以上で入力してください',
  },
};

export const Required: Story = {
  args: {
    label: 'ユーザー名',
    placeholder: 'ユーザー名を入力',
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    label: '編集不可',
    value: '編集できない値',
    disabled: true,
  },
};
