import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';
import API from '../../api';
import Header from '../../components/Header/header';
import Forest from '../../assets/Forest.mp4';
import './userProfile.css';

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
        }
        this.updateProfile = this.updateProfile.bind(this);
    }

    componentDidMount() {
        API.myProfile()
            .then(
                result => {
                    if(result.status === 200) {
                        this.setState({ email: result.body.email, 
                                    username: result.body.username});
                    } else {
                        alert("Error occured in retriving you profile! Please try again!");
                    }
                }
            )
            .catch((error) => alert(error));
    }

    updateProfile() {
        API.updateUserProfile(this.state.email)
            .then(
                result => {
                    if(result.status === 200) {
                        alert("Your email has been changed successfully!");
                    } else {
                        alert("Requested email change was unsuccessful!");
                    }
                }
            )
            .catch((error) => console.log(error));
    }

    render() {
        return(
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
                <Header />
                <div className="mainContainer1"> My Details
                    <div className="usernameContainer1">    Username: {this.state.username} </div>
                    <input className="inputContainer1" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value}) } ></input>
                    { <Button className="button1" onClick={this.updateProfile}> Save </Button> }
                </div>

            </React.Fragment>
        )
    }
}