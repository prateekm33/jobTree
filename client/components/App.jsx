import React from 'react';
import { Link } from 'react-router';

import Footer from './Footer';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menuOptions: [
        <Link key={1} to='/about'><div className="menu-highlight"></div>About</Link>,
        <Link key={2} to='/careers'><div className="menu-highlight"></div>Careers</Link>,
        <Link key={3} to='/home'><div className="menu-highlight"></div>temp for Home</Link>,
        <Link key={4} to='/snakes'><div className="menu-highlight"></div>Snakes</Link>,
        <Link key={5} to='/careers'><div className="menu-highlight"></div>Yet Another</Link>
      ]
    }

    this.displayMenuOptions = this.displayMenuOptions.bind(this);
    this.handleTopLvlClicks = this.handleTopLvlClicks.bind(this);
  }

  displayMenuOptions(evt) {

    const hamburger = this.hamburger;
    if (evt.target !== hamburger && evt.target.tagName !== 'A') return;

    const menu = hamburger.querySelector('#menu-options');  

    const currDisplay = window.getComputedStyle(menu).display;
    if (currDisplay === 'none') menu.style.display = 'flex';
    else menu.style.display = 'none';

  }

  handleTopLvlClicks(evt) {
    this.hideDropdowns(evt);
  }

  hideDropdowns(evt) {
    // hide all dropdowns that are not the target
    const dropdowns = Array.prototype.slice.call(document.body.querySelectorAll('.dropdown'));

    dropdowns.forEach(dd => {
      if (evt.target !== dd && !dd.contains(evt.target)) {
        dd.querySelector('.dropdown-menu').style.display = 'none';
      }
    });

  }

  render() {
    return (
      <div onClick={this.handleTopLvlClicks} id='main-app-container'>
        <nav id='header'>
          <div id='inner-nav-div'>
            <Link to="/" id="app-logo">JobTree</Link>

            <div id='main-nav-options'>
              { this.state.menuOptions }
            </div>

            <div id='auth-buttons'>
              <Link to="/signup"><button className='sign-up btn btn-primary'>Sign Up</button></Link>
              <Link to="/login" id="login-link"><button className='log-in btn btn-default'>Log In</button></Link>
            </div>
            <div id='hamburger' ref={el => this.hamburger = el} onClick={this.displayMenuOptions} className="glyphicon glyphicon-menu-hamburger">
              <div id="menu-options">
                { this.state.menuOptions }
              </div>
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