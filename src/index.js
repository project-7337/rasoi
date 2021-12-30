import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, Switch, Route} from "react-router-dom";

require('dotenv').config()

ReactDOM.render((<BrowserRouter>
    <Switch>
        <Route component={App}/>
    </Switch>
</BrowserRouter>), document.getElementById('root'))

