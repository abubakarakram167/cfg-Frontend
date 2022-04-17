import React, {useState, useEffect, Suspense} from 'react';
import {Redirect, Route, Switch} from 'react-router';
import {
  BrowserRouter as Router,
  withRouter,
  useHistory,
} from 'react-router-dom';
import Loader from '@crema/core/Loader';

import Admin from './admin';
import Home from './home';
import Auth from 'pages/auth-pages';
import ResetPassword from 'pages/auth-pages/reset-password/index';
import CreatePassword from 'pages/auth-pages/create-password/index';
import SessionExpired from 'pages/auth-pages/session-expired/index';
import ErrorPage from 'pages/auth-pages/error-page/index';
import ShowMiniContent from 'pages/showContent';
import UnAuthorizedPage from 'pages/unauthorized-page';
import {ToastContainer, toast} from 'react-toastify';
import {Offline, Online} from 'react-detect-offline';
import LoadingBar from 'react-top-loading-bar';

const user = JSON.parse(localStorage.getItem('current-user'));
const RouteComponent = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  let history = useHistory();
  const [progress, setProgress] = useState(0);

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

  useEffect(() => {
    setTimeout(() => {
      setProgress(40);
    }, 2000);
    setTimeout(() => {
      setProgress(100);
    }, 4000);
  }, []);

  return (
    <div>
      <LoadingBar
        color='#f7b21e'
        progress={progress}
        height={6}
        onLoaderFinished={() => setProgress(0)}
      />
      <Offline>
        <div
          style={{
            height: '20px',
            backgroundColor: 'black',
            color: 'white',
            textAlign: 'center',
          }}>
          <h4 style={{color: 'white', textAlign: 'center'}}>You're Offline</h4>
        </div>
      </Offline>

      <Router>
        <Suspense fallback={<Loader />}>
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
            <Route exact path='/error'>
              <ErrorPage />
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
        </Suspense>
      </Router>
      <ToastContainer />
    </div>
  );
};

export default RouteComponent;
