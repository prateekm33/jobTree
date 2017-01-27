import React from 'react';


export default class Job extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserEdit = this.handleUserEdit.bind(this);
    this.handleEditBtnClick = this.handleEditBtnClick.bind(this);
    console.log(props)
  }

  handleUserEdit(evt) {
    const keyCode = evt.keyCode;
    const enter = 13;

    switch (keyCode) {
      case enter:
        if (!evt.shiftKey) {
          evt.preventDefault();
          evt.target.blur();
          // this.props.job[evt.target.classList.value] = evt.target.innerText;
          const updatedJob = Object.assign({}, this.props.job, {
            [evt.target.classList.value]: evt.target.innerText
          });
          this.props.editJob(this.props.idx, updatedJob);
        }
        return;
      default:
        return;
    }

  }

  formatDate(date) {
    date = new Date(date);
    return date.toDateString();
  }

  handleEditBtnClick(evt) {
    evt.preventDefault();

    console.log('TODO --- ROUTE TO /manage/jobs')
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
        <div className="date_applied">{this.formatDate(this.props.job.date_applied)}</div>
        <div className="role">
          <div>Role:</div>
          <div>{this.props.job.role} </div>
        </div>
        <div className="location">
          <div>Location:</div>
          <div>{this.props.job.location}</div>
        </div>
        <div className={"status" + " " + this.props.job.status.toLowerCase()}>
          <div>Status:</div>
          <div>{this.props.job.status}</div>
        </div>
        <div className="recruiter">
          <div>Recruiter:</div>
          <div>{this.props.job.recruiter}</div>
        </div>
        <button onClick={this.handleEditBtnClick} className="edit btn btn-default">Edit</button>
      </div>
    )
  }

  render() {
    return this.props.type === 'table' ? 
      this.renderTable() :
      this.renderSmall();
  }
}