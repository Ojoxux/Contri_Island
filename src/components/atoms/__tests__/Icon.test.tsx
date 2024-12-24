import { render } from '@testing-library/react';
import { Icon } from '../Icon';

describe('Icon', () => {
  it('デフォルトの属性でレンダリングされること', () => {
    const { container } = render(<Icon name="test" />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  it('カスタムサイズが適用されること', () => {
    const { container } = render(<Icon name="test" size={32} />);
    const svg = container.querySelector('svg');

    expect(svg).toHaveAttribute('width', '32');
    expect(svg).toHaveAttribute('height', '32');
  });

  it('アイコン名が正しく使用されること', () => {
    const { container } = render(<Icon name="github" />);
    const use = container.querySelector('use');

    expect(use).toHaveAttribute('href', '/icons.svg#github');
  });

  it('追加のSVGプロパティが適用されること', () => {
    const { container } = render(
      <Icon name="test" className="custom-class" fill="red" />
    );
    const svg = container.querySelector('svg');

    expect(svg).toHaveClass('custom-class');
    expect(svg).toHaveAttribute('fill', 'red');
  });
});
