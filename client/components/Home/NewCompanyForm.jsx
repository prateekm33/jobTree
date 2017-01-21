import React from 'react';

import NewJobsForm from './NewJobsForm';

export default class NewCompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.saveRecruiterName = this.saveRecruiterName.bind(this);
    this.handleAddNewJob = this.handleAddNewJob.bind(this);
    this.deleteJobAt = this.deleteJobAt.bind(this);
    this.showForms = this.showForms.bind(this);

    this.state = {
      recruiterName: '',
      jobKey: 0,
      jobForms: [<NewJobsForm handleDelete={this.deleteJobAt} key={0} num={1} recruiterName={''} />],

      count: 1
    }

  }

  saveRecruiterName(evt) {
    this.setState({recruiterName: evt.target.value});
  }

  handleAddNewJob(evt) {
    evt.preventDefault();
    const length = this.state.jobForms.length;
    this.state.jobForms.push(
      <NewJobsForm handleDelete={this.deleteJobAt} key={this.state.jobKey+1} num={length + 1} recruiterName={this.state.recruiterName}/>
    )

    this.setState({jobKey: this.state.jobKey + 1});
  }

  deleteJobAt(idx) {
    this.state.jobForms.splice(idx, 1);
    this.forceUpdate();
  }

  showForms() {

  }

  render() {
    return (
      <form id='new-company'>
        <div className="form-line">
          <div>
            <label htmlFor="company-name">Company Name </label>
            <input id="company-name" className="form-control" placeholder="Company name" />
          </div>
        </div>
        <div className="form-line">
          <div>
            <label htmlFor="recruiter-name">Recruiter Name </label>
            <input onBlur={this.saveRecruiterName} id="recruiter-name" className="form-control" placeholder="Recruiter name" />
          </div>
        </div>
        <div id="jobs-forms-container">
          <div className="form-line">
            <div style={{fontSize: '1.2em', fontWeight: 'bold', height: "50%", alignSelf: "flex-end"}}>New Jobs</div>
            <button onClick={this.handleAddNewJob} className="btn btn-default glyphicon glyphicon-plus"></button>
          </div>
          {
            // this.state.jobForms.map(i => i).reverse()
            this.state.jobForms
          }
        </div>
      </form>
    )
  }
}