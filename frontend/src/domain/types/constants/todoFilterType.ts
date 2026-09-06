export const TODO_FILTER_TYPE = {
  ALL: 'all',
  CHECK: 'checked',
  UNCHECK: 'unchecked',
  TRASH: 'trashed',
} as const;

export type Todo_Filter_Type = (typeof TODO_FILTER_TYPE)[keyof typeof TODO_FILTER_TYPE];
