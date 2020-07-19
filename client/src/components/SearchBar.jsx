import React from 'react';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <div>
                <p>SearchBar</p>
                <form>
                    <div className="searchbar-container">
                        <label className="searchbar-left input-bar-label" htmlFor="find">Find</label>
                        <input className="searchbar-find" type="text" id="find" name="find" placeholder="burgers, barbers, spa, handymen..." />
                        <label className="input-bar-label" htmlFor="near">Near</label>
                        <input className="searchbar-near" type="text" id="near" name="near" placeholder="address, neighborhood, city, state or zip" />
                        <img className="searchbar-icon" src="./images/search.svg" />
                    </div>
                </form>
            </div>
        )
    }
}