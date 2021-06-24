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

  render() {
    return (
      <React.Fragment>
        <h2>{`Task Master`}</h2>
        <Button className="button">{`Sign In`}</Button>
        <Button className="button">{`Sign Up`}</Button>
      </React.Fragment>
    );
  }
}
