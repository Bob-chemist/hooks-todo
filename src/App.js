import React, { useContext, useReducer } from 'react';
import { ContextUser } from './index';

const initialState = {
  count: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'increment':
      return {
        count: state.count + 1,
      };
    case 'decrement':
      return {
        count: state.count - 1,
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value1 = useContext(ContextUser);
  return (
    <div>
      <p>{state.count}</p>
      <button
        className="border p-1 m-1"
        onClick={() => dispatch({ type: 'increment' })}
      >
        Increment
      </button>
      <button
        className="border p-1 m-1"
        onClick={() => dispatch({ type: 'decrement' })}
      >
        Decrement
      </button>
      <button
        className="border p-1 m-1"
        onClick={() => dispatch({ type: 'reset' })}
      >
        Reset
      </button>
    </div>
  );
}

export default App;
