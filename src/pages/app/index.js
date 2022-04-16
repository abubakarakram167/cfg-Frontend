import React, {useEffect} from 'react';

import {Provider, useDispatch} from 'react-redux';
import configureStore from '../../redux/store/index';
import {socket} from 'socket';
import RouteComponent from './route-component';
import jsCookie from 'js-cookie';
import {getPostById} from 'redux/actions/UserPost';
export default React.memo(function MainApp() {
  const dispatch = useDispatch();
  console.log(configureStore());
  const login = false;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('current-user'));
    if (user) {
      if (jsCookie.get('login')) {
        socket.windowAction(user.id);
      }
    }
  }, []);
  return (
    <Provider store={configureStore()}>
      <RouteComponent />
    </Provider>
  );
});
