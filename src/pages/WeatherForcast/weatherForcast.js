import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';

export default class WeatherData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            country: "",
            lat: "",
            lon: "",
        };
        this.checkValue = this.checkValue.bind(this);
    }

    async checkValue(event) {
        const myAPIKey = "074cd3f6368f6265d00c16f1b431f814";

        event.preventDefault();
        if (this.state.city === "") {
            console.log("City can not be null");
        } else {
            // GeoCoding the lattitude and Longitude
            await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${this.state.city}&appid=${myAPIKey}`
            )
                .then((res) => res.json())
                .then((data) => this.setState({ lat: data[0].lat, lon: data[0].lon }));

            // Finding city and it's weather based on the latitude and longitude
            const data = await fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${this.state.lat}&lon=${this.state.lon}&appid=${myAPIKey}`
            )
                .then((res) => res.json())
                .then((data) => {
                    const weekForcast = data.daily.map(day => {
                        return day.weather[0].main;
                    })
                    
                })
                .catch((error) => alert("The following error has occured:" + error));
        }

    }

    weatherForm() {
        return (
            <form style={{ textAlign: 'center' }}>
                <input type="text" placeholder="City" onChange={e => { this.setState({ city: e.target.value }) }} />
                <input type="text" placeholder="country" onChange={e => { this.setState({ country: e.target.value }) }} />
                <Button className="button" onClick={this.checkValue}>Submit</Button>
            </form>
        );
    }
    render() {
        return this.weatherForm();
    }
}