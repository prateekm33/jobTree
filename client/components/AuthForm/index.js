import React from 'react';
import { Link } from 'react-router';


export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

  }

  render() {
    return (
      <form id={this.props.id} onSubmit={this.handleSubmit}>
        <div className="form-element">
          <div className="form-title">{this.props.title}</div>
          <Link to={this.props.otherForm.link}>{this.props.otherForm.name}</Link>
        </div>
        <div className="form-element">
          <input className="form-control" placeholder="Username / Email" type="text"/>
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