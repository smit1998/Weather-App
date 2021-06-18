import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './styles/App.css';
import './styles/index.css';

function App() {
  const [currentTask, setCurrentTask] = useState('');

  useEffect(() => {
    fetch('/api/tasks').then(res => res.json()).then(data => {
      setCurrentTask(data.tasks);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {`Hello World! The first task is: ${currentTask}`}
      </header>
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
