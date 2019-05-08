import React, { useState, useContext, useEffect } from 'react';
import TodosContext from '../context';
import Axios from 'axios';

export default function TodoForm() {
  const [todo, setTodo] = useState('');
  const {
    state: { currentTodo = {} },
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
    if (currentTodo.text) {
      dispatch({ type: 'UPDATE_TODO', payload: todo });
    } else {
      const response = await Axios.post(
        'https://hooks-todo-9b98c.firebaseio.com/todos.json',
        {
          text: todo,
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

  return (
    <form className="flex justify-center p-5" onSubmit={handleSubmit}>
      <input
        type="text"
        className="border-black border-solid border-2"
        onChange={event => setTodo(event.target.value)}
        value={todo}
      />
    </form>
  );
}
