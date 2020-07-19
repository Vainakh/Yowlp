import axios from 'axios';
import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

import Home from './Home.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
        let coordinates;
        navigator.geolocation.getCurrentPosition(position => {
            coordinates =
                {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
            axios.post('/nearbyCity', coordinates).then(response => {
                console.log(response.data.name);
            })
        })
    }

    render(){
        return(
            <div>
                {/*<Home />*/}
                <Main />
                <Footer />
            </div>
        )
    }
}