import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from "react-router-dom";
require('dotenv').config()

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

ReactDOM.render((<BrowserRouter>
    <Switch>
        {/*<Route path={process.env.REACT_APP_PUBLIC_URL + "/customer"} component={}/>*/}
        <Route component={App}/>
    </Switch>
</BrowserRouter>), document.getElementById('root'))

