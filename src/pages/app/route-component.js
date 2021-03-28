import React, {useState, useEffect} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {BrowserRouter as Router, withRouter} from 'react-router-dom';
import Admin from './admin';
import Auth from 'pages/auth-pages';
import ResetPassword from 'pages/auth-pages/reset-password/index';
import CreatePassword from 'pages/auth-pages/create-password/index';
import ProtectedRoute from './protectedRouter';

const RouteComponent = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

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
          <ProtectedRoute exact path='/admin' component={withRouter(Admin)} />
          {/* <Route path='/admin'>
            {() => {
              if (loggedIn) {
                return <Admin />;
              } else {
                return <Redirect to='/' />;
              }
            }}
          </Route> */}
          <Route path='/' exact>
            {() => {
              if (loggedIn) {
                return <Redirect to='/admin' />;
              } else {
                return <Auth />;
              }
            }}
          </Route>
          <Route path='/reset'>
            <ResetPassword />
          </Route>
          <Route path='/createPassword'>
            <CreatePassword />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default RouteComponent;
