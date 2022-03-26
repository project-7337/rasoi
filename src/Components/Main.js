import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Customer from './customer/Customer'
import RestaurantDetails from './restaurant/RestaurantDetails';
import UserProfile from './profile/UserProfile';
import CompleteProfile from './profile/CompleteProfile'
import Seller from "./seller/Seller";

/** Routing performed here is on the sub-app level, where the componenets having the Navbar need to be routed from here, so that we do no re render the navbar in the componenets */

export default function Main() {
	return <main>
		<Switch>
			<Route exact path={process.env.REACT_APP_PUBLIC_URL + "/"} component={Customer} />
			<Route path={process.env.REACT_APP_PUBLIC_URL + "/seller"} component={Seller} />
			<Route path={process.env.REACT_APP_PUBLIC_URL + "/UserProfile"} component={UserProfile} />
			<Route path={process.env.REACT_APP_PUBLIC_URL + "/completeprofile"} component={CompleteProfile} />
			<Route path={process.env.REACT_APP_PUBLIC_URL + "/RestaurantDetails"} component={RestaurantDetails} />
		</Switch>
	</main>
}