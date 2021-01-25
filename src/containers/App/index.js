import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {hot} from 'react-hot-loader/root';
import Login from "../Auth/Login/Loadable";
import {Register, RegisterLink} from "../Auth/Register/Loadable";
import HomePage from '../HomePage/Loadable';
import FeaturePage from '../FeaturePage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
//Admin Pages

import MainPage  from '../Dashboard/MainPage/Loadable';
import Categories  from '../Dashboard/Categories/Loadable';

import {withRouter} from "react-router-dom";
import ProtectedRoute from './protectedRouter'


function App() {
    return (
        <div>
            <Switch>
                <ProtectedRoute exact path="/" component={withRouter(HomePage)}/>
                <Route path="/register" component={withRouter(Register)}/>
                <Route path="/registration-completed" component={withRouter(RegisterLink)}/>
                <Route exact path="/login" component={withRouter(Login)}/>
                <Route path="/features" component={withRouter(FeaturePage)}/>


                {/*Dashboard Links*/}
                <ProtectedRoute path="/dashboard" component={withRouter(MainPage)}/>
                <ProtectedRoute path="/categories" component={withRouter(Categories)}/>
                <Route path="" component={NotFoundPage}/>
            </Switch>
        </div>
    );
}

export default hot(App);
