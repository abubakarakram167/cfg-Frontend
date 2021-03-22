import {createStore, applyMiddleware} from 'redux';
import {authReducer} from './reducers/auth-reducer';
import thunk from 'redux-thunk';
import {rootReducer} from './reducers';

function configureStore(state = {}) {
  const store = createStore(rootReducer, state, applyMiddleware(thunk));
  return store;
}

export default configureStore;
