import axios from 'axios';
import React from 'react';
import { BrowserRouter, Route, Switch, NavLink, HashRouter } from 'react-router-dom';

import Home from './Home.jsx';
import Main from './Main.jsx';
import Review from './Review';
import Footer from './Footer.jsx';

// const Layout = ({children}) => {
//     return (
//         <div>
//             <main>{children}</main>
//         </div>
//     );
// };

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: ''
        };
    }

    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={Main}/>
                    <Route exact path={`/review`} component={Review}/>
                </Switch>
            </BrowserRouter>
        )
    }
}