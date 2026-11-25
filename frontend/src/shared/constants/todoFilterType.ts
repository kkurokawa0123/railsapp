export const TODO_FILTER_TYPE = {
  ALL: 'all',
  CHECK: 'checked',
  UNCHECK: 'unchecked',
  TRASH: 'trashed',
} as const;

export type Todo_Filter_Type = (typeof TODO_FILTER_TYPE)[keyof typeof TODO_FILTER_TYPE];

export const TRASHED_STATUS = {
  CHECKED: 1,
  UNCHECKED: 0,
} as const;

export type IsTrashedStatus = (typeof TRASHED_STATUS)[keyof typeof TRASHED_STATUS];

export const DONE_STATUS = {
  CHECKED: 1,
  UNCHECKED: 0,
} as const;

export type IsDoneStatus = (typeof DONE_STATUS)[keyof typeof DONE_STATUS];
