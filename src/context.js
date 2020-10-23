import { createContext } from 'react';

const TodosContext = createContext({
  todos: {},
  currentTodo: {},
  loading: true,
});

export default TodosContext;
