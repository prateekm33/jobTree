import React from 'react';
import { Link } from 'react-router';


export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav id='footer'>
        <div id='footer-divider'></div>
        <div id='nav-options'>
          <Link to='/about'>About</Link>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Log In</Link>
          <Link to='/careers'>Careers</Link>
        </div>
      </nav>
    )
  }
}