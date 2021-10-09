import React from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import '../../styles/button.css';
import API from '../../api';
import Header from '../../components/Header/header';
import '../Home/home.css';

export default class Favourite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: []
        };
    }

    componentDidMount() {
        API.getAllFavourite()
            .then( result => {
                if(result.status === 200) {
                    const data = result.body;
                    const loc = data.map(l => {
                        return l.locations;
                    })
                    this.setState({ locations: loc });
                }
            })
            .catch((error) => alert(error));
    }

}

    