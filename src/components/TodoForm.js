import React, { useState, useContext, useEffect } from 'react';
import TodosContext from '../context';
import Axios from 'axios';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const {
    state: { todos, currentTodo = {} },
    dispatch,
  } = useContext(TodosContext);

  useEffect(() => {
    if (currentTodo.text) {
      setTodo(currentTodo.text);
    } else {
      setTodo('');
    }
    // eslint-disable-next-line
  }, [currentTodo.id]);

  const handleSubmit = async event => {
    event.preventDefault();
    if (todo.trim() === '') {
      return;
    }
    for (let i in todos) {
      if (todo.trim().toLowerCase() === todos[i].text.toLowerCase()) {
        return;
      }
    }

    if (currentTodo.text) {
      const response = await Axios.patch(
        `https://hooks-todo-9b98c.firebaseio.com/todos/${currentTodo.id}.json`,
        { text: todo.trim() }
      );
      dispatch({
        type: 'UPDATE_TODO',
        payload: { text: response.data.text, id: currentTodo.id },
      });
    } else {
      if (Object.keys(todos).length === 20) {
        return;
      }
      const response = await Axios.post(
        'https://hooks-todo-9b98c.firebaseio.com/todos.json',
        {
          text: todo.trim(),
          complete: false,
        }
      );
      dispatch({
        type: 'ADD_TODO',
        payload: {
          ...JSON.parse(response.config.data),
          id: response.data.name,
        },
      });
    }
    setTodo('');
  };

  const handleClear = () => {
    setTodo('');
    dispatch({
      type: 'CLEAR_CURRENT_TODO',
    });
  };

  return (
    <form className="flex justify-center p-5" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-black border-solid border-2 m-1 p-2 rounded"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
      <button type="submit" className="bg-orange rounded m-1 p-2">
        Submit
      </button>
      <button
        className="bg-teal text-white m-1 p-2 rounded"
        onClick={handleClear}
      >
        Clear
      </button>
    </form>
  );
}
