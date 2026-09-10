import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

declare global {
  // React の act() を有効化するためのグローバルフラグ
  // 参考: https://react.dev/reference/react/act
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

afterEach(() => {
  cleanup();
});
