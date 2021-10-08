import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';
import API from '../../api';
import WeatherData from '../WeatherForcast/weatherForcast';
import Forest from '../../assets/Forest.mp4'

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
        <div style={{
          backgroundSize: 'cover',
          backgroundImage: `url("https://cdn.vox-cdn.com/thumbor/z7bKIfTyJq3ibFF7YRYSCoxH3eI=/0x0:1004x753/920x613/filters:focal(422x296:582x456):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/63710251/20150428-cloud-computing.0.1489222360.0.jpg")`,
          width: '100vw',
          height: '100vh'
        }}>
          <h2 style={{textAlign: 'center'}}>{`Weather Forcast`}</h2>
          <WeatherData />
          <Button className="button" onClick={this.handleLogOut}>{`Log Out`}</Button>
        </div>
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
