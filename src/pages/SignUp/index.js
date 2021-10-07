import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import '../../styles/button.css';
import '../../styles/form.css';
import API from '../../api';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      error: '',
      accountCreated: false,
    };
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  redirectToPath(path) {
    window.location.href = path;
  }

  handleSignUp(event) {
    event.preventDefault();
    const { username, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: 'The passwords do not match. Please try again.' });
      return;
    }

    API.signUp(username, password)
      .then(
        result => {
          const data = result.body;
          if (result.status === 400) {
            this.setState({ error: data.password[0] });
          } else if (result.status !== 201) {
            this.setState({ error: 'We could not process your request at this time. Please try again.' });
          } else {
            this.setState({ accountCreated: true });
          }
        },
      );
  }

  renderSignUpPage() {
    const { error } = this.state;

    return (
      <React.Fragment>
        <h2>{`Sign Up`}</h2>
        <Alert show={error !== ''} variant="danger">{error}</Alert>
        <form className="form" onSubmit={this.handleSignUp}>
          <Form.Group className="form-group">
            <Form.Label>{'Username'}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={this.state.username}
              onChange={e => this.setState({ username: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>{'Password'}</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>{'Confirm Password'}</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              onChange={e => this.setState({ confirmPassword: e.target.value })}
            />
          </Form.Group>
          <Button className="button" type="submit">{`Sign Up`}</Button>
        </form>
      </React.Fragment>
    );
  }

  renderSignUpSuccess() {
    return (
      <React.Fragment>
        <h1>{'Your account has been successfully created!'}</h1>
        <Button
          className="button"
          onClick={() => this.redirectToPath('/login')}
        >
          {`Go to the login page`}
        </Button>
      </React.Fragment>
    );
  }

  render() {
    const { accountCreated } = this.state;
    return accountCreated ? this.renderSignUpSuccess() : this.renderSignUpPage();
  }
}