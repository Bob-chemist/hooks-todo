import React, { useContext } from 'react';
import { ContextUser } from './index';

function App() {
  const value1 = useContext(ContextUser);
  return <div>Hello, {value1}</div>;
}

export default App;
