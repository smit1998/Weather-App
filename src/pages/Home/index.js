import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';
import API from '../../api';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      loading: true,
    };
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentDidMount() {
    API.getUsers()
      .then(
        result => {
          if (result.status === 200) {
            this.setState({ loading: false, loggedIn: true });
          } else {
            this.setState({ loading: false });
          }
        },
      );
  }

  navigateToPage(path) {
    window.location.href = path;
  }

  handleLogOut() {
    API.logout()
      .then(
        result => {
          if (result.status === 204) {
            this.setState({ loggedIn: false });
            sessionStorage.removeItem('_auth');
          }
        },
      );
  }

  renderNotLoggedIn() {
    return (
      <React.Fragment>
        <h2>{`Task Master`}</h2>
        <Button className="button" onClick={() => this.navigateToPage('/login')}>{`Login`}</Button>
        <Button className="button" onClick={() => this.navigateToPage('/signup')}>{`Sign Up`}</Button>
      </React.Fragment>
    );
  }

  renderLoggedIn() {
    return (
      <React.Fragment>
        <h2>{`Task Master`}</h2>
        <Button className="button" onClick={this.handleLogOut}>{`Log Out`}</Button>
      </React.Fragment>
    );
  }

  render() {
    const { loading, loggedIn } = this.state;

    if (loading) {
      return null;
    }

    return loggedIn ? this.renderLoggedIn() : this.renderNotLoggedIn();
  }
}
