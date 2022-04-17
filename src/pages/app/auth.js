import React, {Suspense, lazy} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Loader from '@crema/core/Loader';

const ResetPassword = lazy(() =>
  import('pages/auth-pages/reset-password/index'),
);
const Auth = lazy(() => import('pages/auth-pages'));

const auth = () => {
  return (
    <div>
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path='/'>
              <Auth />
            </Route>
            <Route path='/reset'>
              <ResetPassword />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default auth;
