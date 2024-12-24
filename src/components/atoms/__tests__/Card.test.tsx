import { render, screen } from '@testing-library/react';
import { Card } from '../Card';
import { describe, it, expect } from 'vitest';

describe('Card', () => {
  it('子要素が正しくレンダリングされること', () => {
    render(<Card>カードの内容</Card>);
    expect(screen.getByText('カードの内容')).toBeInTheDocument();
  });

  it('デフォルトのvariantが適用されること', () => {
    const { container } = render(<Card>カード</Card>);
    expect(container.firstChild).toHaveClass(
      'card bg-white/90 shadow-acnh border-2 border-acnh-green'
    );
  });

  it('各variantが正しく適用されること', () => {
    const variants = {
      default: 'card bg-white/90 shadow-acnh border-2 border-acnh-green',
      bordered: 'card bg-white/90 border-2 border-acnh-green',
      compact:
        'card card-compact bg-white/90 shadow-acnh border-2 border-acnh-green',
    };

    Object.entries(variants).forEach(([variant, expectedClass]) => {
      const { container } = render(
        <Card variant={variant as 'default' | 'bordered' | 'compact'}>
          カード
        </Card>
      );
      expect(container.firstChild).toHaveClass(expectedClass);
    });
  });

  it('追加のclassNameが適用されること', () => {
    const { container } = render(<Card className="custom-class">カード</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
