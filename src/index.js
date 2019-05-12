import React, { useState, useEffect, useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import TodosContext from './context';
import todosReducer from './reducer';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Loader from './components/Loader';
import Axios from 'axios';

const useAPI = endpoint => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);

  const getData = async () => {
    try {
      const response = await Axios.get(endpoint);
      if (response.data) {
        for (let i in response.data) {
          const todo = response.data[i];
          todo.id = i;
        }
        setData(response.data);
      } else {
        setData({});
      }
    } catch (error) {
      console.log(error);
    }
  };
  return data;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);

  const savedTodos = useAPI(
    'https://hooks-todo-9b98c.firebaseio.com/todos.json'
  );

  useEffect(() => {
    dispatch({
      type: 'GET_TODOS',
      payload: savedTodos,
    });
  }, [savedTodos]);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      {state.loading ? <Loader /> : <TodoList />}
    </TodosContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
