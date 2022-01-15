import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './Components/login/Login'
import UserProfile from './Components/customer/UserProfile';
import CompleteProfile from './Components/customer/CompleteProfile'
import { store } from './Redux/store'
import { Provider } from 'react-redux'
import ThemeContextWrapper from './Themes/themeWrapper';
import RestaurantDetails from './Components/customer/RestaurantDetails';

require('dotenv').config()

{/** Routing performed here is on the comlpete App Level */}

render((

	<BrowserRouter>
		<Provider store={store}>
		<ThemeContextWrapper>
			<Switch>

				<Route path={process.env.REACT_APP_PUBLIC_URL + "/login"} component={Login} />
				{/** move these routes to the Main.js */}
				<Route path={process.env.REACT_APP_PUBLIC_URL + "/UserProfile"} component={UserProfile} />
				<Route path={process.env.REACT_APP_PUBLIC_URL + "/completeprofile"} component={CompleteProfile} />
				<Route path={process.env.REACT_APP_PUBLIC_URL + "/RestaurantDetails"} component={RestaurantDetails} />

				<Route component={App} />

			</Switch>
			</ThemeContextWrapper>
		</Provider>
	</BrowserRouter>
), document.getElementById('root'))

