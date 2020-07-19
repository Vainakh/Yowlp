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
            pictures: [],
            data: []
        };
    }

    componentWillMount() {
        // let coordinates;
        // navigator.geolocation.getCurrentPosition(position => {
        //     coordinates =
        //         {
        //             latitude: position.coords.latitude,
        //             longitude: position.coords.longitude
        //         };
        //     axios.post('/nearbyCity', coordinates).then(response => {
        //         console.log(response.data.name);
        //     })
        // })
        let id = 1;

        axios.get('/review/' + id).then(response => {
            this.setState({
                pictures: response.data.pictures,
                data: response.data
            });
        });
    }

    render(){
        return(
            <div>
                {/*<Home />*/}
                {/*<Main />*/}
                {/*<Footer />*/}
                <div className="review-picture-container">
                    {this.state.pictures.map((picture, index) => {
                        console.log(picture);
                        return (
                            <img className="review-picture" src={picture} />
                        )
                    })}
                </div>
                <div className="review-main-container">
                    <div className="review-container">
                        <div className="restaurant-title">{this.state.data.restaurant_name}</div>
                        <img className="review-image" src={`./images/${this.state.data.rating}.png`} />
                    </div>
                    <div className="contacts">
                        <div>{this.state.data.phone_number}</div>
                    </div>
                </div>
            </div>
        )
    }
}