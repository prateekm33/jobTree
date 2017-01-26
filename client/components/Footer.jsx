import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';



class Footer extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <nav id='footer'>
        <div id='nav-options'>
          <div className="footer-component">
            <div className="footer-component-title">Learn More</div>
            <div className="footer-component-body">
              <Link to='/about'>About</Link>
              <Link to='/blog'>Blog</Link>
            </div>
          </div>
          <div className="footer-component">
            <div className="footer-component-title">Connect</div>
            <div className="footer-component-body">
              <Link to='/contact'>Contact</Link>
              <Link to='/contact'>Twitter</Link>
              <Link to='/contact'>Facebook</Link>
            </div>
          </div>
          <div className="footer-component">
            <div className="footer-component-title">Links</div>
            <div className="footer-component-body">
              <Link to='/faq'>FAQ</Link>
              <Link to='/careers'>Careers</Link>
              { !this.props.user ? <Link to='/signup'>Sign Up</Link> : null }
              { !this.props.user ? <Link to='/login'>Log In</Link> : null }
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user };
}
export default connect(mapStateToProps)(Footer);