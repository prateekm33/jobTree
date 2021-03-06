import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../redux/actions';

import Footer from './Footer';
import UserSettings from './UserSettings';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      menuOptions: [
        <Link key={1} to='/about'><div className="menu-highlight"></div>About</Link>,
        <Link key={2} to='/careers'><div className="menu-highlight"></div>Careers</Link>,
      ]
    }

    this.displayMenuOptions = this.displayMenuOptions.bind(this);
    this.handleTopLvlClicks = this.handleTopLvlClicks.bind(this);
    this.addShadow = this.addShadow.bind(this);
    window.onbeforeunload = this.dispatchSaveJobs.bind(this);
  }

  dispatchSaveJobs() {
    this.props.dispatch(actions.saveUserState(this.props.user));
  }

  componentDidMount() {
    window.addEventListener('scroll', this.addShadow);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.addShadow);
  }

  addShadow() {
    this.nav.classList.toggle('shadow', document.body.scrollTop > 0);
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
        <nav ref={el => this.nav = el} id='header'>
          <div id='inner-nav-div'>
            <div>
              <div id='hamburger' ref={el => this.hamburger = el} onClick={this.displayMenuOptions} className="glyphicon glyphicon-menu-hamburger">
                <div id="menu-options">
                  { this.state.menuOptions }
                </div>
              </div>
              <Link to="/" id="app-logo">
                JobTree
              </Link>
            </div>
            <div id='main-nav-options'>
              { this.state.menuOptions }
            </div>

            {
              !this.props.user ? 
                <div id='auth-buttons'>
                  <Link to="/signup"><button className='sign-up btn btn-primary'>Sign Up</button></Link>
                  <Link to="/login" id="login-link"><button className='log-in btn btn-default'>Log In</button></Link>
                </div>
              : <UserSettings />
            }
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

function mapStateToProps(state) {
  return {user: state.user};
}

export default connect(mapStateToProps)(App);