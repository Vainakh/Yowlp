import axios from 'axios';
import React from 'react';

export default class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: [],
            data: []
        };
    }

    componentWillMount() {
        const { id } = this.props.location.state

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
                            <img key={index} className="review-picture" src={picture} />
                        )
                    })}
                </div>
                <div className="review-main-container">
                    <div className="review-container">
                        <div className="restaurant-title">{this.state.data.restaurant_name}</div>
                        <img className="review-image" src={`./images/${this.state.data.rating}.png`} />
                        <div className="restaurant-category">{this.state.data.category}</div>
                        <div className="ronalds-rating-container">
                            <div className="ronalds-rating-text">Seat Comfort Rating By Alex Ronalds </div>
                            <img src={`./images/${this.state.data.ronalds_rating}a.svg`} />
                        </div>

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