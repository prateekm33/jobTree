import React from 'react';
import { Link } from 'react-router';


export default class Footer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <nav id='footer'>
        <div id='nav-options'>
          <Link to='/about'>About</Link>
          <Link to='/careers'>Careers</Link>
          <Link to='/contact'>Contact</Link>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Log In</Link>
        </div>
      </nav>
    )
  }
}