import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from './Components/login/Login'
import {appStore,persistor} from './Redux/store'
import { Provider } from 'react-redux'
import ThemeContextWrapper from './Themes/themeWrapper';
import { PersistGate } from 'redux-persist/integration/react'
import { CircularProgress } from '@material-ui/core';
require('dotenv').config()

/** Routing performed here is on the comlpete App Level */

render((

	<BrowserRouter>
		<Provider store={appStore}>
			<PersistGate loading={<CircularProgress/>} persistor={persistor}>
				<ThemeContextWrapper>
					<Switch>
						<Route path={process.env.REACT_APP_PUBLIC_URL + "/login"} component={Login} />
						<Route component={App} />
					</Switch>
				</ThemeContextWrapper>
			</PersistGate>
		</Provider>
	</BrowserRouter>
), document.getElementById('root'))

