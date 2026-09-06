import { createContext, useContext } from 'react';
import { type Todo_Filter_Type } from '@/domain/types/constants/todoFilterType';

export type TodoStatusContextType = {
  todoFilter: Todo_Filter_Type;
  onSetTodoFilter: (todo_type: Todo_Filter_Type) => void;
};

export const TodoStatusContext = createContext<TodoStatusContextType | undefined>(
  {} as TodoStatusContextType,
);

export const useTodoStatusContext = () => {
  const context = useContext(TodoStatusContext);
  if (!context) {
    throw new Error('useAuth must be used within TodoStatusProvider');
  }
  return context;
};
