import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    fetch('/api/user/')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loading: false
          });
        },
        (error) => {
          this.setState({
            loading: false
          });
        }
      );
  }

  navigateToPage(path) {
    window.location.href = path;
  }

  render() {
    return (
      <React.Fragment>
        <h2>{`Task Master`}</h2>
        <Button className="button" onClick={() => this.navigateToPage('/login')}>{`Login`}</Button>
        <Button className="button" onClick={() => this.navigateToPage('/signup')}>{`Sign Up`}</Button>
      </React.Fragment>
    );
  }
}
