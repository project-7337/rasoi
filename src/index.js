import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './Components/login/Login'
import appStore from './Redux/store'
import { Provider } from 'react-redux'
import ThemeContextWrapper from './Themes/themeWrapper';

require('dotenv').config()

{/** Routing performed here is on the comlpete App Level */}

render((

	<BrowserRouter>
		<Provider store={appStore}>
		<ThemeContextWrapper>
			<Switch>

				<Route path={process.env.REACT_APP_PUBLIC_URL + "/login"} component={Login} />
				{/** move these routes to the Main.js */}

				<Route component={App} />

			</Switch>
			</ThemeContextWrapper>
		</Provider>
	</BrowserRouter>
), document.getElementById('root'))

