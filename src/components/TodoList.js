import { useContext } from 'react';
import TodosContext from '../context';
import Axios from 'axios';
import { ReactComponent as EditIcon } from '../assets/edit.svg';
import { ReactComponent as DeleteIcon } from '../assets/delete.svg';

function TodoList() {
  const { state, dispatch } = useContext(TodosContext);
  const length = Object.keys(state.todos).length;
  let title = length > 0 ? `${length} Todos` : 'Nothing to do!';

  return (
    <div className="container mx-auto max-w-md text-center font-mono p-1">
      <h1 className="text-bold pt-4">{title}</h1>
      {length >= 20 ? (
        <p className="text-bold text-red">
          You have reached maximum amount of todos. Please, delete some!
        </p>
      ) : (
        <p>You can add {20 - length} more todos!</p>
      )}
      <ul className="list-reset text-white p-0">
        {Object.keys(state.todos).map((i) => {
          const todo = state.todos[i];
          return (
            <li
              key={todo.id}
              className="flex items-center bg-orange-dark border black border-dashed border-2 my-2 py-2"
            >
              <span
                onClick={async () => {
                  const response = await Axios.patch(
                    `https://hooks-todo-9b98c.firebaseio.com/todos/${todo.id}.json`,
                    { complete: !todo.complete }
                  );
                  dispatch({
                    type: 'TOGGLE_TODO',
                    payload: { ...response.data, id: todo.id },
                  });
                }}
                className={`flex-1 ml-12 cursor-pointer ${
                  todo.complete && 'line-through text-grey-darkest'
                }`}
              >
                {todo.text}
              </span>
              <button
                onClick={() =>
                  dispatch({ type: 'SET_CURRENT_TODO', payload: todo })
                }
                style={{ marginRight: 10 }}
              >
                <EditIcon
                  alt="Edit Icon"
                  className="h-6"
                  style={{ width: 30 }}
                />
              </button>
              <button
                onClick={async () => {
                  await Axios.delete(
                    `https://hooks-todo-9b98c.firebaseio.com/todos/${todo.id}.json`
                  );
                  dispatch({ type: 'REMOVE_TODO', payload: todo });
                }}
              >
                <DeleteIcon
                  alt="Delete Icon"
                  className="h-6"
                  style={{ width: 30 }}
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
