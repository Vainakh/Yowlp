import React from 'react';
import axios from "axios";

import { Redirect } from 'react-router-dom';
import Review from "./Review.jsx";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            find: "",
            dropdown: [],
            showDropdown: true,
            navigate: false,
            id: "",
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFind = this.handleChangeFind.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
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
                this.setState({
                    location: response.data.name
                });
            })
        })
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    };

    handleChange(event) {
        this.setState({
            location: event.target.value
        });
    }

    handleChangeFind(event) {
        event.persist();
        let searchQuery = { query: event.target.value };

        axios.post('/find', searchQuery).then(response => {
            this.setState({
                find: event.target.value,
                dropdown: response.data
            });
        });
    }

    navigateTo(index) {
        this.setState({
            id: this.state.dropdown[index].id,
            redirect: true
        });
    }

    render(){
        let dropdown;
        let redirect;

        if (this.state.redirect) {
            redirect =
                <div>
                    <Redirect to={{pathname: '/review', state: {id: this.state.id}}}/>
                </div>
        } else {
            redirect = undefined;
        }


        if (this.state.showDropdown && this.state.find) {
            dropdown =
                <div className="searchbar-find-dropdown">
                    {this.state.dropdown.map((name, index) => {
                        return (
                            <div key={index} className="dropdown-result" onClick={() => {this.navigateTo(index)}}>
                                {name.restaurant_name}
                            </div>
                        )
                    })}
                </div>
        } else {
            dropdown = undefined;
        }
        return(
            <div>
                <form>
                    <div className="searchbar-container">
                        <label className="searchbar-left input-bar-label" htmlFor="find">Find</label>
                        <input className="searchbar-find"
                               type="text"
                               id="find"
                               name="find"
                               placeholder="burgers, barbers, spa, handymen..."
                               onChange={this.handleChangeFind}
                               onBlur={this.handleBlur}
                               onFocus={this.handleFocus} />
                        <label className="input-bar-label" htmlFor="near">Near</label>
                        <input className="searchbar-near"
                               value={this.state.location}
                               type="text"
                               id="near"
                               name="near"
                               placeholder="address, neighborhood, city, state or zip"
                               onChange={this.handleChange}/>
                        <img className="searchbar-icon" src="./images/search.svg" />
                    </div>
                </form>
                {dropdown}
                {redirect}
            </div>
        )
    }
}