import React, {useEffect} from 'react';

import {Provider} from 'react-redux';
import configureStore from '../../redux/store/index';
import {socket} from 'socket';
import RouteComponent from './route-component';
export default function MainApp() {
  console.log(configureStore());
  const login = false;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('current-user'));
    if (user) {
      socket.windowAction(user.id);
    }
  }, []);
  return (
    <Provider store={configureStore()}>
      <RouteComponent />
    </Provider>
  );
}
