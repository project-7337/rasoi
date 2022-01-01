import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Customer from './customer/Customer'
import Seller from "./seller/Seller";

export default function Main() {
    return <main>
        <Switch>
            <Route exact path={process.env.REACT_APP_PUBLIC_URL + "/"} component={Customer} />
            <Route path={process.env.REACT_APP_PUBLIC_URL + "/seller"} component={Seller} />
        </Switch>
    </main>
}