import React from 'react';


export default class Job extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserEdit = this.handleUserEdit.bind(this);
  }

  handleUserEdit(evt) {
    const keyCode = evt.keyCode;
    const enter = 13;

    switch (keyCode) {
      case enter:
        if (!evt.shiftKey) {
          evt.preventDefault();
          evt.target.blur();
          // todo -- update value in job for cell
        }
        return;
      default:
        return;
    }

  }

  formatDate(date) {
    return date.toDateString();
  }

  renderTable() {
    return (
      <tr onKeyDown={this.handleUserEdit} className="job-component">
        <td></td>
        <td contentEditable={true} className="status">{this.props.job.status}</td>
        <td contentEditable={true} className="role">{this.props.job.role}</td>
        <td contentEditable={true} className="location">{this.props.job.location}</td>
        <td contentEditable={true} className="recruiter">{this.props.job.recruiter}</td>
        <td contentEditable={true} className="date_applied">{this.formatDate(this.props.job.date_applied)}</td>
      </tr>
    )
  }

  renderSmall() {
    return (
      <div onKeyDown={this.handleUserEdit} className="job-component">
        <div contentEditable={true} className="status">{this.props.job.status}</div>
        <div contentEditable={true} className="role">{this.props.job.role}</div>
        <div contentEditable={true} className="location">{this.props.job.location}</div>
        <div contentEditable={true} className="recruiter">{this.props.job.recruiter}</div>
        <div contentEditable={true} className="date_applied">{this.formatDate(this.props.job.date_applied)}</div>
      </div>
    )
  }

  render() {
    return this.props.type === 'table' ? 
      this.renderTable() :
      this.renderSmall();
  }
}