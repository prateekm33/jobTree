import React from 'react';
import { connect } from 'react-redux';

import actions from '../../redux/actions';

class UserSettings extends React.Component {
  constructor() {
    super();
    this.handleLogOut = this.handleLogOut.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }

  handleLogOut() {
    this.props.dispatch(actions.logOutUser());
  }

  toggleDropDown(evt) {
    const target = evt.target;
    if (target === this.menuUL) return;

    const currDisplay = window.getComputedStyle(this.menuUL).display;
    if (currDisplay === 'none') this.menuUL.style.display = 'flex';
    else this.menuUL.style.display = 'none';
  }

  render() {
    return (
      <div id='nav-user-settings'>
        <div onClick={this.toggleDropDown} ref={el => this.toggleEl = el} id='user-dropdown' className="dropdown">
          <div>{this.props.user}</div>
          <div style={{left: "0.5em", fontSize: "0.4em", top: "0.8em"}} className="glyphicon glyphicon-menu-down"></div>
          <ul ref={el => this.menuUL = el} className="dropdown-menu">
            <li onClick={this.handleLogOut}>Log Out</li>
          </ul>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {user: state.user};
}

export default connect(mapStateToProps)(UserSettings);