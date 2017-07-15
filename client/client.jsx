import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import Routes from './Routes';

// require stylesheets for webpack
require('../public/style/css/style.css');
require('../public/style/sass/style.scss');

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>, document.getElementById('app'),
);
