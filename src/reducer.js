export default function todosReducer(state, action) {
  switch (action.type) {
    case 'GET_TODOS':
      return {
        ...state,
        todos: action.payload,
      };

    case 'ADD_TODO':
      const { payload } = action;
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
      const updatedTodos = { ...state.todos };
      updatedTodos[action.payload.id].text = action.payload.text;
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

    case 'CLEAR_CURRENT_TODO':
      return {
        ...state,
        currentTodo: {},
      };
    default:
      return state;
  }
}
