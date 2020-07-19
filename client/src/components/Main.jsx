import React from 'react';

import SearchBar from './SearchBar.jsx'

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <div className="main-container">
                <div className="logo-container">
                    <span className="main-title" >Yowlp</span>
                    <img className="main-logo" src="./images/logo.svg" />
                </div>
                <SearchBar />
            </div>
        )
    }
}