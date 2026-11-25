import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

import { useAuthContex } from '@/presentation/contexts/authContext';
import { useFindTodos } from '@/queries/hooks/todo/useTodoMutation';

export const TodoMain = () => {
  const { user, isAuthenticated } = useAuthContex();
  const { data: todos, isLoading } = useFindTodos();

  if (!isAuthenticated || isLoading) {
    return null;
  }
  return (
    <>
      <div>user.name:{user?.name}</div>
      <div>user.email:{user?.email}</div>
    </>
  );
};
