import React from 'react';

import {Provider} from 'react-redux';
import configureStore from '../../redux/store/index';

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
