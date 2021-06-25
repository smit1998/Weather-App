import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../../styles/button.css';
import '../../styles/form.css';

export default class SignUpPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>{`Sign Up`}</h2>
        <Form className="form">
          <Form.Group className="form-group">
            <Form.Label>{'Username'}</Form.Label>
            <Form.Control type="email" placeholder="Username" />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>{'Password'}</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>{'Confirm Password'}</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" />
          </Form.Group>
        </Form>
        <Button className="button">{`Sign Up`}</Button>
      </React.Fragment>
    );
  }
}
