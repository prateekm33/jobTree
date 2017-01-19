import React from 'react';

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
            <div id='app-logo'>JobTree</div>
            <div id='auth-buttons'>
              <button className='sign-up btn btn-primary'>Sign Up</button>
              <button className='log-in btn btn-default'>Log In</button>
            </div>
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