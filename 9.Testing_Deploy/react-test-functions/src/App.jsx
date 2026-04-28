import { useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
      <div>
        <h1>This is counter app</h1>
        <div data-testid="counter-value">Count: {counter}</div>
        <button onClick={() => setCounter(counter + 1)}>Increment</button>
        <button onClick={() => setCounter(counter - 1)}>Decrement</button>
      </div>
  );
};

export default App;