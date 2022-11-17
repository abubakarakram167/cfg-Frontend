import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import LocaleProvider from '@crema/utility/LocaleProvider';
import CremaThemeProvider from '@crema/utility/CremaThemeProvider';
import CremaStyleProvider from '@crema/utility/CremaStyleProvider';
import ContextProvider from '@crema/utility/ContextProvider';
import configureStore from './redux/store';
import MainApp from 'pages/app';
import AppWithErr from './appWithErr';

import {ConnectedRouter} from 'connected-react-router';
import AppLayout from '@crema/core/AppLayout';
import AuthRoutes from '@crema/utility/AuthRoutes';
import CssBaseline from '@material-ui/core/CssBaseline';
import {history} from './redux/store';
import UserConnections from 'pages/user-home-page/user-connections';
import UserHome from 'pages/user-home-page/user-home';
import UserRewards from 'pages/user-home-page/user-rewards';
import UserAchievements from 'pages/user-home-page/user-achievement';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

const store = configureStore();

export default function App() {

  return (
    <ContextProvider>
      <Provider store={store}>
        <CremaThemeProvider>
          <CremaStyleProvider>
            <LocaleProvider>
              {/* <ConnectedRouter history={history}>
              <AuthRoutes>
                <CssBaseline />
                <AppLayout />
              </AuthRoutes>
            </ConnectedRouter> */}
              {/* <UserHome /> */}
              <AppWithErr />
            </LocaleProvider>
          </CremaStyleProvider>
        </CremaThemeProvider>
      </Provider>
    </ContextProvider>
  );
}
