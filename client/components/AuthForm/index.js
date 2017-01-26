import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import {validateAuthForm} from '../Utils';


class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissMsg = this.dismissMsg.bind(this);
    this.state = {
      formInvalid: false,
      errMsgs: []
    }
  }

  componentDidMount() {
    this.usernameInput.focus();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const form = evt.target;
    const response = validateAuthForm(form);
    const inputs = response.inputs;
    this.setState({formInvalid: !response.valid, errMsgs: response.msg.split('***')});
    if (!response.valid) {
      inputs.forEach(input => {
        input.style.border = '2px solid red';
      });
      return;
    } 


    const user = {};
    inputs.forEach(input => {
      input.style.border = '';
      if (input.type === 'password') user.password = input.value;
    });
    user.username = this.usernameInput.value;

    this.props.dispatch(actions.submitAuthForm(user, form.id));

  }

  dismissMsg(evt) {
    this.props.dispatch(actions.invalidCreds(false));
  }

  render() {
    return (
      <form id={this.props.id} onSubmit={this.handleSubmit}>
        {
          this.state.formInvalid ? 
            this.state.errMsgs.map((msg, idx) => (
              <div key={idx} className="form-invalid-msg">{msg}</div>
            )) : null
        }
        <div className="form-element">
          <div className="form-title">{this.props.title}</div>
          <div><Link to={this.props.otherForm.link}>{this.props.otherForm.name}</Link></div>
        </div>
        {
          this.props.invalidCreds ? 
            <div onClick={this.dismissMsg} className="invalid-creds">
              <div id="close">Click to close</div>
              <div>
                {
                  this.props.id === 'login-form' ? "Either the username or password is incorrect" : "An account with that username already exists"
                }
              </div>
            </div> : null
        }
        <div className="form-element">
          <input ref={el => this.usernameInput = el} className="form-control" name="username" placeholder="Username / Email" type="text"/>
        </div>
        <div className="form-element"> 
          <input name="password" className="form-control" placeholder="Password" type="password"/>
        </div>
        {
          this.props.extras && this.props.extras.map((i,idx) => (
            <div className="form-element" key={idx}>{i}</div>
          ))
        }
        
        <input type='submit' value={this.props.submitVal} className="btn btn-primary"/>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {invalidCreds: state.invalidCreds};
}
export default connect(mapStateToProps)(AuthForm);