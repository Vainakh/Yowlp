import React from 'react';
import axios from "axios";

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            find: "",
            dropdown: [],
            showDropdown: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeFind = this.handleChangeFind.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
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

    handleChange(event) {
        console.log('handleChange');
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

    handleBlur() {
        this.setState({
            showDropdown: false
        });
    }

    handleFocus() {
        this.setState({
            showDropdown: true
        });
    }

    render(){
        let dropdown;

        if (this.state.showDropdown && this.state.find) {
            dropdown =
                <div className="searchbar-find-dropdown">
                    {this.state.dropdown.map((name, index) => {
                        return (
                            <div className="dropdown-result" key={index}> {name.restaurant_name}</div>
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
            </div>
        )
    }
}