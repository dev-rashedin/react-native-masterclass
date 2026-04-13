
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { View, Text } from 'react-native'
const useStats = () => {

  const todos = useQuery(api.todos.getTodos);
    const totalTodos = todos ? todos.length : 0;
  const completedTodos = todos ? todos.filter((todo) => todo.isCompleted).length : 0;
  const activeTodos = totalTodos - completedTodos;
  const progressPercentage =
    totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0;

  return {
    totalTodos,
    completedTodos,
    activeTodos,
    progressPercentage,
  }
}
export default useStats