import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom'

import Home from './Home.jsx'

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    render(){
        return(
            <div>
                <Home />
            </div>
        )
    }
}