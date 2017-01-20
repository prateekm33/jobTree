import React from 'react';
import { Link } from 'react-router';

import Footer from './Footer';

export default class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id='main-app-container'>
        <nav id='header'>
          <div id='inner-nav-div'>
            <Link to="/" id="app-logo">JobTree</Link>

            <div id='main-nav-options'>
              <Link to='/about'><div className="menu-highlight"></div>About</Link>
              <Link to='/careers'><div className="menu-highlight"></div>Careers</Link>
              <Link to='/home'><div className="menu-highlight"></div>temp for Home</Link>
              <Link to='/careers'><div className="menu-highlight"></div>Another Pg</Link>
              <Link to='/careers'><div className="menu-highlight"></div>Yet Another</Link>
            </div>

            <div id='auth-buttons'>
              <Link to="/signup"><button className='sign-up btn btn-primary'>Sign Up</button></Link>
              <Link to="/login" id="login-link"><button className='log-in btn btn-default'>Log In</button></Link>
            </div>
            <div id='hamburger' className="glyphicon glyphicon-menu-hamburger"></div>
          </div>
        </nav>

        <div id='content-container'>
          {
            this.props.children
          }
        </div>

        <Footer />
      </div>
    )
  }
}