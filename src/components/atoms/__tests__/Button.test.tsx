import { render, screen } from '@testing-library/react';
import { Button } from '../Button';

describe('Button', () => {
  it('子要素が正しくレンダリングされること', () => {
    render(<Button>テストボタン</Button>);
    expect(screen.getByText('テストボタン')).toBeInTheDocument();
  });

  it('デフォルトのvariantとsizeが適用されること', () => {
    const { container } = render(<Button>ボタン</Button>);
    expect(container.firstChild).toHaveClass('btn-primary btn-md');
  });

  it('各variantが正しく適用されること', () => {
    const variants = ['primary', 'secondary', 'accent', 'ghost'] as const;
    variants.forEach((variant) => {
      const { container } = render(<Button variant={variant}>ボタン</Button>);
      expect(container.firstChild).toHaveClass(`btn-${variant}`);
    });
  });

  it('各sizeが正しく適用されること', () => {
    const sizes = ['sm', 'md', 'lg'] as const;
    sizes.forEach((size) => {
      const { container } = render(<Button size={size}>ボタン</Button>);
      expect(container.firstChild).toHaveClass(`btn-${size}`);
    });
  });

  it('追加のclassNameが適用されること', () => {
    const { container } = render(
      <Button className="custom-class">ボタン</Button>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
