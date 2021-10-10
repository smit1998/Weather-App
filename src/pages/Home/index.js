import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';
import API from '../../api';
import WeatherData from '../WeatherForcast/weatherForcast';
import Forest from '../../assets/Forest.mp4';
import Clouds from '../../assets/Clouds.mov';
import Header from '../../components/Header/header';
import './home.css';

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
          
        <h2 style={{textAlign:'center', fontSize: '100px', color: 'green'}}>{`Weather Forcast`}</h2>
        <Button className="button" onClick={() => this.navigateToPage('/login')} style={{ backgroundColor: 'green' }}>{`Login`}</Button>
        <Button className="button" onClick={() => this.navigateToPage('/signup')} style={{ backgroundColor: 'green' }}>{`Sign Up`}</Button>
      </React.Fragment>
    );
  }

  renderLoggedIn() {
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
            <source src={Clouds} type="video/mp4" />
          </video>
          <Header />
          
          <WeatherData />
          <Button className="logOutButton" onClick={this.handleLogOut}>{`Log Out`}</Button>
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
