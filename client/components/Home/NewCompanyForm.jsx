import React from 'react';

import NewJobsForm from './NewJobsForm';

export default class NewCompanyForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recruiterName: '',
      jobFormsCount: 1
    }

    this.saveRecruiterName = this.saveRecruiterName.bind(this);
    this.genNewJobForms = this.genNewJobForms.bind(this);
    this.handleAddNewJob = this.handleAddNewJob.bind(this);
  }

  saveRecruiterName(evt) {
    this.setState({recruiterName: evt.target.value});
  }

  genNewJobForms() {
    const count = this.state.jobFormsCount;
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push(
        <NewJobsForm recruiterName={this.state.recruiterName}/>
      )
      
    }

    return arr;
  }

  handleAddNewJob(evt) {
    evt.preventDefault();
    this.setState({jobFormsCount: this.state.jobFormsCount + 1})
  }

  render() {
    return (
      <form id='new-company'>
        <div className="form-line">
          <label htmlFor="company-name">Company Name </label>
          <input id="company-name" className="form-control" placeholder="Company name" />
        </div>
        <div className="form-line">
          <label htmlFor="recruiter-name">Recruiter Name </label>
          <input onBlur={this.saveRecruiterName} id="recruiter-name" className="form-control" placeholder="Recruiter name" />
        </div>
        <div id="jobs-forms-container">
          <button onClick={this.handleAddNewJob} className="btn btn-default glyphicon glyphicon-plus"></button>
          New Jobs
          {
            this.genNewJobForms()
          }
        </div>
      </form>
    )
  }
}