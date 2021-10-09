import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';
import './weatherForcast.css';
import API from '../../api';

export default class WeatherData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            lat: "",
            lon: "",
            todayWeather: "",
            todayTemp: "",
            weekWeather: [],
            weekTempMax: [],
            weekTempMin: [],
            background_video: "Hi there",
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
                    console.log(data);
                    this.setState({ todayWeather: data.current.weather[0].main, 
                                    todayTemp: data.current.temp + " F"});

                    const weekForcast = data.daily.map(day => {
                        return day.weather[0].main;
                    })

                    const weekTempMax = data.daily.map(day => {
                        return day.temp.max;
                    })

                    const weekTempMin = data.daily.map(day => {
                        return day.temp.min;
                    })
                    this.setState({ 
                                    weekWeather: weekForcast, 
                                    weekTempMax: weekTempMax, 
                                    weekTempMin: weekTempMin
                                });
                    
                })
                .catch((error) => alert("The following error has occured:" + error));
        }

    }

    weatherBox() {
        return (
            <div background_video={this.state.background_video}>
                <form style={{ textAlign: 'center' }}>
                    <input type="text" placeholder="City" onChange={e => { this.setState({ city: e.target.value }) }} />
                    <Button className="button" onClick={this.checkValue}>Submit</Button>
                </form>
                <div className="mainContainer">
                    <div className="todayWeatherContainer">{this.state.todayTemp}{this.state.todayWeather}</div>
                    <div className="weekWeatherContainer">
                        <div className="eachDayContainer">
                            {this.state.weekWeather[0]}
                            {this.state.weekTempMax[0]}
                        </div>
                        <div className="eachDayContainer">{this.state.weekWeather[1]}</div>
                        <div className="eachDayContainer">{this.state.weekWeather[2]}</div>
                        <div className="eachDayContainer">{this.state.weekWeather[3]}</div>
                        <div className="eachDayContainer">{this.state.weekWeather[4]}</div>
                        <div className="eachDayContainer">{this.state.weekWeather[5]}</div>
                        <div className="eachDayContainer">{this.state.weekWeather[6]}</div>
                    </div>
                    <Button>Add To Favourite</Button>
                </div>
            </div>
        );
    }

    weatherForm() {
        return (
            <form style={{ textAlign: 'center' }}>
                <input type="text" placeholder="City" onChange={e => { this.setState({ city: e.target.value }) }} />
                <Button className="button" onClick={this.checkValue}>Submit</Button>
            </form>
        )
    }

    render() {
        if(this.state.city) {
            return this.weatherBox();
        }
        return this.weatherForm();
    }
}