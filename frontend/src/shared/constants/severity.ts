// メッセージレベル
export const SEVERITY = {
  ERROR: 'error',
  SUCCESS: 'success',
  INFO: 'info',
  WARNING: 'warning',
} as const;

export type Severity = (typeof SEVERITY)[keyof typeof SEVERITY];
