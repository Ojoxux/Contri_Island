import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup();
});
