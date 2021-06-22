import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import HomePage from './pages/Home';
import './styles/App.css';
import './styles/index.css';
import './styles/button.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <HomePage />
      </div>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
