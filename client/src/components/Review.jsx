import axios from 'axios';
import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            data: []
        };
    }

    componentWillMount() {
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
                        <div className="restaurant-category">{this.state.data.category}</div>
                    </div>
                    <div className="contacts-container">
                        <div className="phone-container">
                            <img className="image-phone" src='./images/phone.svg' />
                            <div className="review-phone-text">{this.state.data.phone_number}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}