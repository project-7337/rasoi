import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './Components/login/Login'
import UserProfile from './Components/customer/UserProfile';
require('dotenv').config()

render((<BrowserRouter>
    <Switch>
		<Route path={process.env.REACT_APP_PUBLIC_URL + "/login"} component={Login} />
		<Route path={process.env.REACT_APP_PUBLIC_URL + "/UserProfile"} component={UserProfile} />
        <Route component={App}/>
    </Switch>
</BrowserRouter>), document.getElementById('root'))

