import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import AdminHome from 'pages/admin-home';
import {Provider} from 'react-redux';
import ResetPassword from 'pages/auth-pages/reset-password/index';
import configureStore from 'backend-integration/store';
import Admin from './admin';
import Auth from './auth';
import RouteComponent from './route-component';
export default function index() {
  console.log(configureStore());
  const login = false;
  return (
    <Provider store={configureStore()}>
      <RouteComponent />
    </Provider>
  );
}
