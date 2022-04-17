import React from 'react';
import ReactDOM from 'react-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-notifications-component/dist/theme.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-table/react-table.css';
import './shared/styles/index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import '@crema/services';
import './fonts/Gotham-Font/GothamMedium.ttf';
import './fonts/rissa/Rissa.ttf';
import './fonts/angelina/angelina.ttf';
import {SnackbarProvider} from 'notistack';
require('apminsight')();

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <SnackbarProvider maxSnack={3}>
    <App />
  </SnackbarProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// //Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
