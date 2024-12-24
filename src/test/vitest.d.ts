import '@testing-library/jest-dom';

declare module 'vitest' {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers<any> {}
}

interface CustomMatchers<R = unknown> {
  toBeInTheDocument(): R;
  toHaveClass(...classNames: string[]): R;
}
