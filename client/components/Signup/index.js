import React from 'react';

import AuthForm from '../AuthForm'

export default class Signup extends React.Component {
  constructor() {
    super()
  }

  renderPWConfirm() {
    return (
      <input className="form-control" placeholder="Confirm password" type="password"/>
    )
  }

  render() {
    return (
      <div id='signup-container'>
        <AuthForm id='signup-form' title="Sign Up" otherForm={{link: '/login', name: 'Log In'}} submitVal="Sign Up" extras={[this.renderPWConfirm()]} />
      </div>
    )
  }
}