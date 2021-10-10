import React from 'react';
import './header.css';
import Logo from '../../assets/Logo.png';

export default class Header extends React.Component {

    navigateToPage(path) {
        window.location.href = path;
    }

    header() {
        return (
            <div className="navBar">
                <div className="weatherLogo" onClick={() => this.navigateToPage('/')}> Weather Forcast</div>
                <div className="navElements" onClick={() => this.navigateToPage('/')}> Home </div>
                <div className="navElements2" onClick={() => this.navigateToPage('/Favourites')}>Favourites</div>
                <div className="navElements2" onClick={() => this.navigateToPage('/Maps')}>Maps</div>
                <div className="navElements2" onClick={() => this.navigateToPage('/Profile')}>Profile</div>
            </div>
        );
    }

    render() {
        return this.header();
    }
}