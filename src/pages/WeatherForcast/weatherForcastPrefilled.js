import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';
import './weatherForcast.css';
import API from '../../api';

export default class WeatherForcastPrefilled extends React.Component {
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
            inFavourite: true,
        };
        this.checkValue = this.checkValue.bind(this);
        this.removeFromFav = this.removeFromFav.bind(this);
    }
    
    componentDidMount() {
        var url = window.location.href;
        var urlArray = url.split("/");
        this.setState({ city: urlArray[4] });
    }

    removeFromFav() {
        console.log("123 is here!");
        const location = this.state.city;
        API.removeFromFavourite(location)
            .then(
                result => {
                    if (result.status === 201) {
                        alert(location + " removed from your favourites list!");
                    } else {
                        console.log("unsuccessful to remove fav");
                        alert("Your request can not be processed at this moment!");
                    }
                }
            )
    }

    async checkValue(event) {
        console.log('1');
        
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
                    this.setState({
                        todayWeather: data.current.weather[0].main,
                        todayTemp: Math.round(data.current.temp - 273) + " C"
                    });

                    const weekForcast = data.daily.map(day => {
                        return day.weather[0].main;
                    })

                    const weekTempMax = data.daily.map(day => {
                        return Math.round(day.temp.max -273);
                    })

                    const weekTempMin = data.daily.map(day => {
                        return Math.round(day.temp.min - 273);
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

    settingCity() {
        var url = window.location.href;
        var urlArray = url.split("/");
        this.setState({ city: urlArray[4]});
    }

    decideButton() {
        let count = 0;
            let today = new Date();
            let todayDate = today.getDate();
            let todayMonth = today.getMonth() + 1;
            let todayYear = today.getFullYear();


            let day1 = new Date();
            day1.setDate(day1.getDate() + 1);
            let day1Date = day1.getDate();
            let day1Month = day1.getMonth() + 1;


            let day2 = new Date();
            day2.setDate(day2.getDate() + 2);
            let day2Date = day2.getDate();
            let day2Month = day2.getMonth() + 1;


            let day3 = new Date();
            day3.setDate(day3.getDate() + 3);
            let day3Date = day3.getDate();
            let day3Month = day3.getMonth() + 1;


            let day4 = new Date();
            day4.setDate(day4.getDate() + 4);
            let day4Date = day4.getDate();
            let day4Month = day4.getMonth() + 1;


            let day5 = new Date();
            day5.setDate(day5.getDate() + 5);
            let day5Date = day5.getDate();
            let day5Month = day5.getMonth() + 1;


            let day6 = new Date();
            day6.setDate(day6.getDate() + 6);
            let day6Date = day6.getDate();
            let day6Month = day6.getMonth() + 1;

            return (
                <div background_video={this.state.background_video}>
                    <form style={{ textAlign: 'center' }}>
                        <input type="text" className="inputCity" value={this.state.city} placeholder="  CITY"/> <br />
                        <Button className="submitButton" onClick={this.checkValue}>Ok</Button>
                    </form>
                    <div className="mainContainer">
                        <div className="todayWeatherContainer">{this.state.todayTemp}<br />{this.state.todayWeather} <br /> {todayDate}/{todayMonth}/{todayYear}</div>
                        <div className="weekWeatherContainer">
                            <div className="eachDayContainer">
                                {"Today"} <br /> <br />
                                {this.state.weekWeather[0]} <br /> <br />
                                {"TMax - "}{this.state.weekTempMax[0]} <br /><br />
                                {"TMin - "}{this.state.weekTempMin[0]} <br />
                            </div>
                            <div className="eachDayContainer">
                                {day1Date}/{day1Month} <br /> <br />
                                {this.state.weekWeather[1]} <br /> <br />
                                {"TMax - "}{this.state.weekTempMax[1]} <br /><br />
                                {"TMin - "}{this.state.weekTempMin[1]} <br />
                            </div>
                            <div className="eachDayContainer">
                                {day2Date}/{day2Month} <br /> <br />
                                {this.state.weekWeather[2]} <br /> <br />
                                {"TMax - "}{this.state.weekTempMax[2]} <br /><br />
                                {"TMin - "}{this.state.weekTempMin[2]} <br />
                            </div>
                            <div className="eachDayContainer">
                                {day3Date}/{day3Month} <br /> <br />
                                {this.state.weekWeather[3]} <br /> <br />
                                {"TMax - "}{this.state.weekTempMax[3]} <br /><br />
                                {"TMin - "}{this.state.weekTempMin[3]} <br />
                            </div>
                            <div className="eachDayContainer">
                                {day4Date}/{day4Month} <br /> <br />
                                {this.state.weekWeather[4]} <br /> <br />
                                {"TMax - "}{this.state.weekTempMax[4]} <br /><br />
                                {"TMin - "}{this.state.weekTempMin[4]} <br />
                            </div>
                            <div className="eachDayContainer">
                                {day5Date}/{day5Month} <br /> <br />
                                {this.state.weekWeather[5]} <br /> <br />
                                {"TMax - "}{this.state.weekTempMax[5]} <br /><br />
                                {"TMin - "}{this.state.weekTempMin[5]} <br />
                            </div>
                            <div className="eachDayContainer">
                                {day6Date}/{day6Month} <br /> <br />
                                {this.state.weekWeather[6]} <br /> <br />
                                {"TMax - "}{this.state.weekTempMax[6]} <br /><br />
                                {"TMin - "}{this.state.weekTempMin[6]} <br />
                            </div>
                        </div>
                        {/* <Button className="submitButton" onClick={this.removeFromFav}>Remove From Favourite</Button> */}
                    </div>
                </div>
            );
        
    }

    render() {
        return this.decideButton();
    }
}