import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import App from './App/App';

const initialState = {
  appStarted: false,
  idToken: localStorage.getItem('id_token')
};

const reducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'RUN_APP':
      newState.appStarted = true;
      break;
    case 'SET_ID_TOKEN':
      newState.idToken = action.idToken;
      break;
  }

  return newState;
};

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
