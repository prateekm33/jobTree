import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import * as _ from 'underscore';
window._ = _;

import routes from './routes';

render(
  <Router routes={routes} history={browserHistory} />,
  document.getElementById('react-app')
)