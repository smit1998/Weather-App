import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';

export default class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>{`Task Master`}</div>
        <Button className="button">{`Sign In`}</Button>
        <Button className="button">{`Sign Up`}</Button>
      </React.Fragment>
    );
  }
}
