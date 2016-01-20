'use strict';

import 'babel-core/polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';

const store = configureStore();

let Root;
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'beta' || process.env.NODE_ENV === 'debug') {
    Root = require('./root.prod.js');
} else {
    Root = require('./root.dev.js');
}


render(
  <Root store={store} />,
  document.getElementById('root')
);
