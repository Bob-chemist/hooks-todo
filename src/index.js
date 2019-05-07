import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

export const ContextUser = React.createContext();

const username = 'Bob';

ReactDOM.render(
  <ContextUser.Provider value={username}>
    <App />
  </ContextUser.Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
