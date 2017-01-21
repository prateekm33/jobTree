import React from 'react';

export default class NewJobsForm extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.recruiterInput.value = this.recruiterInput.value || this.props.recruiterName;
  }

  render() {
    return (
      <form className="new-job">
        <div className="form-line">
          <label htmlFor="status-name">Status</label>
          <input id="status-name" className="form-control" placeholder="Status"/>
        </div>
        <div className="form-line">
          <label htmlFor="role-name">Role</label>
          <input id="role-name" className="form-control" placeholder="Role"/>
        </div>
        <div className="form-line">
          <label htmlFor="location-name">Location</label>
          <input id="location-name" className="form-control" placeholder="Location"/>
        </div>
        <div className="form-line">
          <label htmlFor="recruiter-name">Recruiter Name </label>
          <input ref={el => this.recruiterInput = el} id="recruiter-name" className="form-control" placeholder="Recruiter"/>
        </div>
        <div className="form-line">
          <label htmlFor="date-applied">Date Applied </label>
          <input id="date-applied" className="form-control" placeholder="Date Applied"/>
        </div>
      </form>
    )
  }
}