import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

// import components
import App from './components/App';
import LandingPage from './components/LandingPage';
import DNE from './components/DNE';

module.exports = (
  <Route path='/' component={ App }>
    <IndexRoute component={ LandingPage } />
    <Route path='*' component={ DNE } />
  </Route>
)