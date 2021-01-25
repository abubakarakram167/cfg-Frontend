import { configureStore, getDefaultMiddleware, applyMiddleware, compose } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk'
import createReducer from './reducers/reducers';

export default function configureAppStore(initialState = {}, history) {

  const middlewares = [thunkMiddleware, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer]
  const composedEnhancers = compose(...enhancers);

  const store = configureStore({
    reducer: createReducer(),
    preloadedState: initialState,
    middleware: [...getDefaultMiddleware(), ...middlewares],
    composedEnhancers
  });

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  // if (module.hot) {
  //   module.hot.accept('./reducers', () => {
  //     forceReducerReload(store);
  //   });
  // }

  return store;
}
