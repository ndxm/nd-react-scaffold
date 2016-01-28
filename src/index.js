'use strict';

import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';

const store = configureStore();

let Root;
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'beta' || process.env.NODE_ENV === 'debug') {
    Root = require('./root.prod.js').default;
} else {
    Root = require('./root.dev.js').default;
}


render(
  <Root store={store} />,
  document.getElementById('root')
);
