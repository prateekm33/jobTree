import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import * as _ from 'underscore';
window._ = _;


import { store } from './redux/store';
const history = syncHistoryWithStore(browserHistory, store);
import routes from './routes';


render(
  <Provider store={store}>
    <Router routes={routes} history={history} />
  </Provider>,
    document.getElementById('react-app')
)