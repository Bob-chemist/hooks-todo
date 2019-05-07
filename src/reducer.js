import uuidv4 from 'uuid/v4';

export default function todosReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    case 'SET_CURRENT_TODO':
      return {
        ...state,
        currentTodo: action.payload,
      };
    case 'UPDATE_TODO':
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
      const toggledTodos = state.todos.map(todo =>
        todo.id === action.payload.id
          ? { ...action.payload, complete: !action.payload.complete }
          : { ...todo }
      );
      return {
        ...state,
        todos: toggledTodos,
      };

    case 'REMOVE_TODO':
      const removeTodos = state.todos.filter(
        todo => todo.id !== action.payload.id
      );
      return {
        ...state,
        todos: removeTodos,
      };
    default:
      return state;
  }
}
