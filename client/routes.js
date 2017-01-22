import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';

// import components
import App from './components/App';
import LandingPage from './components/LandingPage';
import DNE from './components/DNE';
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';
import Home from './components/Home';

import * as utils from "./Utils";

module.exports = (
  <Route path='/' component={ App }>
    <IndexRoute onEnter={utils.initComponent} component={ LandingPage } />
    <Route path='/signup' onEnter={utils.initComponent} component={ Signup } />
    <Route path='/login' onEnter={utils.initComponent} component={ Login } />
    <Route path='/about' onEnter={utils.initComponent} component={ About } />
    <Route path='/home' onEnter={utils.initComponent} component={ Home } />
    <Route path='*' onEnter={utils.initComponent} component={ DNE } />
  </Route>
)