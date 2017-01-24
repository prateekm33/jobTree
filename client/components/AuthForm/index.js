import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import actions from '../../redux/actions';

import {validateAuthForm} from '../Utils';


class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);

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
    console.log('submitting...', response)
    if (!response.valid) {
      inputs.forEach(input => {
        input.style.border = '2px solid red';
      });
      return;
    } 


    inputs.forEach(input => {
      input.style.border = '';
    });
    const user = {};
    this.props.dispatch(actions.submitAuthForm(user, form.id));

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
        <div className="form-element">
          <input ref={el => this.usernameInput = el} className="form-control" placeholder="Username / Email" type="text"/>
        </div>
        <div className="form-element"> 
          <input className="form-control" placeholder="Password" type="password"/>
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
  return {};
}
export default connect(mapStateToProps)(AuthForm);