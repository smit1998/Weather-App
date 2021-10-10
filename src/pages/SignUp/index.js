import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import '../../styles/button.css';
import '../../styles/form.css';
import API from '../../api';
import Forest from '../../assets/Forest.mp4';
import {
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Col,
} from 'reactstrap';

export default class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
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
    const { username, password, confirmPassword, firstname, lastname, email } = this.state;
    if (password !== confirmPassword) {
      this.setState({ error: 'The passwords do not match. Please try again.' });
      return;
    }

    API.signUp(username, password, email)
      .then(
        result => {
          const data = result.body;
          if (result.status === 400) {
          // console.log(data);
            alert("User with this username exists! Please enter a different username.")
          } else if (result.status !== 201) {
            alert('We could not process your request at this time. Please try again.');
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
        <video autoPlay loop muted style={{
          position: 'absolute',
          width: '100%',
          left: '50%',
          top: '50%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: '-1'
        }}>
          <source src={Forest} type="video/mp4" />
        </video>
          <h2 style={{textAlign: 'center', color: 'green'}}>{`Sign Up`}</h2>
          <Alert show={error !== ''} variant="danger">{error}</Alert>
          <form className="form" onSubmit={this.handleSignUp}>
            <Form.Group className="form-group">
            <Form.Label style={{ color: 'green' }}>{'Username'}</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={this.state.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
            </Form.Group>
          <Form.Group className="form-group">
            <Form.Label style={{ color: 'green' }}>{'email'}</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </Form.Group>
            <Form.Group className="form-group">
            <Form.Label style={{ color: 'green' }}>{'Password'}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="form-group">
            <Form.Label style={{ color: 'green' }}>{'Confirm Password'}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                onChange={e => this.setState({ confirmPassword: e.target.value })}
              />
            </Form.Group>
            <Button className="button" type="submit" style={{backgroundColor: 'green'}}>{`Sign Up`}</Button>
          </form>
      </React.Fragment>
    );
  }

  renderSignUpSuccess() {
    return (
      <React.Fragment>
        <video autoPlay loop muted style={{
          position: 'absolute',
          width: '100%',
          left: '50%',
          top: '50%',
          height: '100%',
          objectFit: 'cover',
          transform: 'translate(-50%, -50%)',
          zIndex: '-1'
        }}>
          <source src={Forest} type="video/mp4" />
        </video>
        <h1>{'Your account has been successfully created!'}</h1>
        <Button
          className="button"
          onClick={() => this.redirectToPath('/login')}
          style={{backgroundColor: 'green'}}
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
