import React from 'react';

const TodosContext = React.createContext({
  todos: {},
  currentTodo: {},
  loading: true,
});

export default TodosContext;
