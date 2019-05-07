import React from 'react';

const TodosContext = React.createContext({
  todos: [
    { id: 1, text: 'Eat', complete: false },
    { id: 2, text: 'Drink', complete: false },
    { id: 3, text: 'Sleep', complete: true },
  ],
  currentTodo: {},
});

export default TodosContext;
