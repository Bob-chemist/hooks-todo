export default function todosReducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };
    case 'ADD_TODO':
      // if (!action.payload.trim()) {
      //   return state;
      // }
      // if (
      //   ~state.todos.findIndex(
      //     todo =>
      //       todo.text.trim().toLowerCase() ===
      //       action.payload.trim().toLowerCase()
      //   )
      // ) {
      //   return state;
      // }
      const { payload } = action;
      console.log(payload);

      return {
        ...state,
        todos: {
          ...state.todos,
          [payload.id]: { ...payload },
        },
      };
    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: action.payload,
      };
    case 'UPDATE_TODO':
      // if (!action.payload.trim()) {
      //   return state;
      // }
      // if (
      //   ~state.todos.findIndex(
      //     todo =>
      //       todo.text.trim().toLowerCase() ===
      //       action.payload.trim().toLowerCase()
      //   )
      // ) {
      //   return state;
      // }
      const updatedTodo = { ...state.currentTodo, text: action.payload };
      const updatedTodoIndex = state.todos.findIndex(
        todo => todo.id === state.currentTodo.id
      );
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1),
      ];
      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos,
      };

    case 'TOGGLE_TODO':
      const toggledTodos = { ...state.todos };
      toggledTodos[action.payload.id].complete = action.payload.complete;
      return {
        ...state,
        todos: toggledTodos,
      };

    case 'REMOVE_TODO':
      const removeTodos = { ...state.todos };
      delete removeTodos[action.payload.id];
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: removeTodos,
      };
    default:
      return state;
  }
}
