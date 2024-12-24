import { render, screen } from '@testing-library/react';
import { Input } from '../Input';
import { describe, it, expect } from 'vitest';

describe('Input', () => {
  it('基本的なinput要素がレンダリングされること', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('ラベルが正しくレンダリングされること', () => {
    render(<Input label="テストラベル" />);
    expect(screen.getByText('テストラベル')).toBeInTheDocument();
  });

  it('エラーメッセージが表示されること', () => {
    render(<Input error="エラーメッセージ" />);
    expect(screen.getByText('エラーメッセージ')).toBeInTheDocument();
  });

  it('エラー状態のクラスが適用されること', () => {
    const { container } = render(<Input error="エラー" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('input-error');
  });

  it('追加のclassNameが適用されること', () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector('input');
    expect(input).toHaveClass('custom-class');
  });

  it('HTMLInputElement の属性が正しく渡されること', () => {
    const handleChange = () => {};
    render(
      <Input
        type="email"
        placeholder="メールアドレス"
        required
        value="test@example.com"
        onChange={handleChange}
      />
    );
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'メールアドレス');
    expect(input).toHaveAttribute('required');
    expect(input).toHaveValue('test@example.com');
  });
});
