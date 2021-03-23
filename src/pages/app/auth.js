import React from 'react';
import ResetPassword from 'pages/auth-pages/reset-password/index';
import Auth from 'pages/auth-pages';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const auth = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path='/'>
            <Auth />
          </Route>
          <Route path='/reset'>
            <ResetPassword />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default auth;
