import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';
import '../Maps/maps.css';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class Maps extends React.Component {

    render() {
        return (
            <div className="MapsContainer">    
                <Map google={this.props.google} zoom={14}>

                    <Marker onClick={this.onMarkerClick} name={'Current Location'} />
                    <InfoWindow onClose={this.InfoWindowClose}>
                        <div>
                        </div>
                    </InfoWindow>

                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyCAgXBp6LdYcyHjrW0P1y3I8JVttUUheTg")
}) (Maps)