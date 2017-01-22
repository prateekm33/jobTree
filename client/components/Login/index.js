import React from 'react';

import AuthForm from '../AuthForm'

export default class Login extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div id='login-container'>
        <AuthForm id="login-form" title="Log In" submitVal="Log In" otherForm={{link: '/signup', name: 'Sign Up'}}/>
      </div>
    )
  }
}