import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import SignUpPage from './pages/SignUp';
import './styles/App.css';
import './styles/index.css';
import './styles/button.css';

class App extends React.Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignUpPage} />
      </Switch>
    );
  }

  render() {
    return (
      <Router>
        <div className="App">
          {this.renderRoutes()}
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
