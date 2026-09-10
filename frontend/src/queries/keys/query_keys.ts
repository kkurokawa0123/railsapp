export const queryKeys = {
  todo: {
    key: ['todos'] as const,
    keyById: (id: string) => ['todos', id] as const,
  },
  authUser: {
    key: ['authUser'] as const,
  },
} as const;
