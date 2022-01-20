import React, {useState, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {
  BrowserRouter as Router,
  withRouter,
  useHistory,
} from 'react-router-dom';
import Admin from './admin';
import Home from './home';
import Auth from 'pages/auth-pages';
import ResetPassword from 'pages/auth-pages/reset-password/index';
import CreatePassword from 'pages/auth-pages/create-password/index';
import SessionExpired from 'pages/auth-pages/session-expired/index';
import ShowMiniContent from 'pages/showContent';
import UnAuthorizedPage from 'pages/unauthorized-page';

const user = JSON.parse(localStorage.getItem('current-user'));
const RouteComponent = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();

  const isAdminUrl = () => {
    if (window.location.href.indexOf('admin') > -1) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (localStorage.getItem('auth-token')) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [localStorage.getItem('auth-token')]);

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path='/createPassword'>
            <CreatePassword />
          </Route>
          <Route exact path='/reset'>
            <ResetPassword />
          </Route>
          <Route exact path='/sessionexpired'>
            <SessionExpired />
          </Route>
          <Route path='/mini/:encrypted_id'>
            <ShowMiniContent />
          </Route>
          <Route path='/unAuthorizedPage'>
            <UnAuthorizedPage />
          </Route>
          {user && user.role === 'candidate' && isAdminUrl() && (
            <Redirect to='/unAuthorizedPage' />
          )}
          {Home}
          {Admin}
          <Route path='/'>
            <Auth />
          </Route>
          {/* <Route path='/editor'>
            <Editor />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
};

export default RouteComponent;
