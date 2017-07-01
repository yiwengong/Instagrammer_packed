import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import Main from './components/Main'; // Our custom react component
import reducers from './reducers';
import {AUTH_USER} from './actions/types';

// Needed for onTouchTap,
// It's a mobile-friendly onClick() alternative for components in Material-UI,
// especially useful for the buttons.
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//If we have a token, consider the user to be signed in
if(token) {
  // we need to update application state
  store.dispatch({type: AUTH_USER});
}

render(
  <Provider store={store}>
    <Main />
  </Provider>
  , document.getElementById('app'));
