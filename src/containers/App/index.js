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
import ForgetPassword from "../Auth/ForgetPassword/Loadable";
import {UserManagement, AddUser, EditUser} from "../Dashboard/UserManagement/Loadable";
import {MultipleAddScreen, MultipleContentScreen} from "../Dashboard/MultipleAddScreen/Loadable";
import ResetPassword from "../Auth/ResetPassword/Loadable";


function App() {
    return (
        <div>
            <Switch>
                <ProtectedRoute exact path="/" component={withRouter(HomePage)}/>
                <Route path="/register" component={withRouter(Register)}/>
                <Route path="/registration-completed" component={withRouter(RegisterLink)}/>
                <Route path="/reset-request" component={withRouter(RegisterLink)}/>
                <Route exact path="/login" component={withRouter(Login)}/>
                <Route path="/features" component={withRouter(FeaturePage)}/>
                <Route path="/forgetPassword/:token?" component={withRouter(ForgetPassword)}/>
                <Route path="/reset" component={withRouter(ResetPassword)}/>


                {/*Dashboard Links*/}
                <ProtectedRoute path="/dashboard" component={withRouter(MainPage)}/>
                <ProtectedRoute path="/categories" component={withRouter(Categories)}/>
                <ProtectedRoute path="/userManagement" component={withRouter(UserManagement)}/>
                <ProtectedRoute path="/addUser" component={withRouter(AddUser)}/>
                <ProtectedRoute path="/editUser" component={withRouter(EditUser)}/>


                <ProtectedRoute path="/add/cfg-tool" component={withRouter(MultipleAddScreen)}/>
                <ProtectedRoute path="/add/reward" component={withRouter(MultipleAddScreen)}/>
                <ProtectedRoute path="/add/events" component={withRouter(MultipleAddScreen)}/>
                <ProtectedRoute path="/add/cfg-session" component={withRouter(MultipleAddScreen)}/>
                <ProtectedRoute path="/add/quiz" component={withRouter(MultipleAddScreen)}/>
                <ProtectedRoute path="/content" component={withRouter(MultipleContentScreen)}/>
                <Route path="" component={NotFoundPage}/>
            </Switch>
        </div>
    );
}

export default hot(App);
