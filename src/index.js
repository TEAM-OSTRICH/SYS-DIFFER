import React from 'react';

import ReactDOM from 'react-dom';

import thunkMiddleware from 'redux-thunk';

import {
  createStore,

  applyMiddleware,

  compose,
} from 'redux';

import { Provider } from 'react-redux';


import App from './App.jsx';


import mainReducers from './main-reducers.js';


const store = createStore(mainReducers, applyMiddleware(thunkMiddleware));


ReactDOM.render(

  <Provider store={store}>

    <App />

  </Provider>,

  document.getElementById('app'),

);
