import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './App/App';

const initialState = {
  idToken: localStorage.getItem('id_token'),
  answers: {}
};

const reducer = (state = initialState, action) => {
  const newState = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case 'SET_ID_TOKEN':
      if (!action.idToken) {
        localStorage.removeItem('id_token');
      }

      newState.idToken = action.idToken;
      break;
    case 'CHANGE_ANSWERS':
      newState.answers = action.value;
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
