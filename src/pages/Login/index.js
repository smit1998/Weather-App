import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import '../../styles/button.css';
import '../../styles/form.css';
import API from '../../api';
import Forest from '../../assets/Forest.mp4'
export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };
    this.handleLogin = this.handleLogin.bind(this);
  }

  redirectToPath(path) {
    window.location.href = path;
  }

  handleLogin(event) {
    event.preventDefault();
    const { username, password } = this.state;

    API.login(username, password)
      .then(
        result => {
          if (result.status === 400) {
            this.setState({ error: 'The username and password combination you have entered is incorrect.' });
          } else if (result.status !== 200) {
            this.setState({ error: 'We could not process your request at this time. Please try again.' });
          } else {
            const data = result.body;
            sessionStorage.setItem('_auth', data.auth_token);
            this.redirectToPath('/');
          }
        },
      );
  }

  render() {
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
          <h2 style={{textAlign: 'center', color: 'green'}}>{`Login`}</h2>
          <Alert show={error !== ''} variant="danger">{error}</Alert>
          <form className="form" onSubmit={this.handleLogin}>
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
            <Form.Label style={{ color: 'green' }}>{'Password'}</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={e => this.setState({ password: e.target.value })}
              />
            </Form.Group>
          <Button className="button" type="submit" style={{ backgroundColor: 'green' }}>{`Login`}</Button>
          </form>
      </React.Fragment>
    );
  }
}
