import React, { useContext } from 'react';
import TodosContext from '../context';
import Axios from 'axios';

function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const length = Object.keys(state.todos).length;
  let title = length > 0 ? `${length} Todos` : 'Nothing to do!';
  if (length >= 20) {
    title += '';
  }
  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      {length >= 20 ? (
        <p className="text-bold text-red">
          You have reached maximum amount of todos. Please, delete some!
        </p>
      ) : (
        <p>You can add {20 - length} more todos!</p>
      )}
      <ul className="list-reset text-white p-0">
        {Object.keys(state.todos).map(i => {
          const todo = state.todos[i];
          return (
            <li
              key={todo.id}
              className="flex items-center bg-orange-dark border black border-dashed border-2 my-2 py-2"
            >
              <span
                onClick={async () => {
                  const response = await Axios.patch(
                    `https://hooks-todo-9b98c.firebaseio.com/todos/${
                      todo.id
                    }.json`,
                    { complete: !todo.complete }
                  );
                  dispatch({
                    type: 'TOGGLE_TODO',
                    payload: { ...response.data, id: todo.id },
                  });
                }}
                className={`flex-1 ml-12 cursor-pointer ${todo.complete &&
                  'line-through text-grey-darkest'}`}
              >
                {todo.text}
              </span>
              <button
                onClick={() =>
                  dispatch({ type: 'SET_CURRENT_TODO', payload: todo })
                }
              >
                <img
                  src="https://icon.now.sh/edit/0050c5"
                  alt="Edit Icon"
                  className="h-6"
                />
              </button>
              <button
                onClick={async () => {
                  await Axios.delete(
                    `https://hooks-todo-9b98c.firebaseio.com/todos/${
                      todo.id
                    }.json`
                  );
                  dispatch({ type: 'REMOVE_TODO', payload: todo });
                }}
              >
                <img
                  src="https://icon.now.sh/delete/8b0000"
                  alt="Delete Icon"
                  className="h-6"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
